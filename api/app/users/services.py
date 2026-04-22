import psycopg2

from app.database import get_db_connection
from app.encryption import hash_password, verify_password
from fastapi import HTTPException, status

"""
  Create a new user with a hashed password.
"""
def create_user(email: str, password: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    hashed_password = hash_password(password)

    cursor.execute(
      "INSERT INTO users (email, master_pass) VALUES (%s, %s)",
      (email, hashed_password),
    )
    conn.commit()

    return {"message": "User registered successfully!"}

  except psycopg2.IntegrityError:
    conn.rollback()
    raise

  except Exception:
    conn.rollback()
    raise

  finally:
    cursor.close()
    conn.close()
    
def get_user_profile(user_email: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      """
      SELECT email, username, first_name, last_name, avatar_color
      FROM users
      WHERE email = %s
      """,
      (user_email,),
    )
    user = cursor.fetchone()

    if user is None:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
      )
    email, username, first_name, last_name, avatar_color  = user

    return {
      "email": email,
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "avatar_color": avatar_color,
    }
    
  finally:
    cursor.close()
    conn.close()
    
def update_user_profile(
  user_email: str,
  username: str,
  first_name: str,
  last_name: str,
  email: str,
  avatar_color: str,
):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    username = username.strip()
    first_name = first_name.strip()
    last_name = last_name.strip()
    email = email.strip()
    avatar_color = avatar_color.strip()
    
    if not username or not first_name or not last_name or not email or not avatar_color:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="All fields are required",
      )
    
    cursor.execute(
      """
      SELECT id
      FROM users
      WHERE username = %s AND email != %s
      """,
      (username, user_email),
    )
    existing_username  = cursor.fetchone()
    
    if existing_username is not None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Username already in use",
      )
      
      
    cursor.execute(
      """
      SELECT id
      FROM users
      WHERE email = %s AND email != %s
      """,
      (email, user_email),
    )
    existing_email = cursor.fetchone()
      
    if existing_email is not None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Email already in use",
      )
    
    cursor.execute(
      """
      UPDATE users
      SET username = %s,
          first_name = %s,
          last_name = %s,
          email = %s,
          avatar_color = %s
      WHERE email = %s
      """,
      (username, first_name, last_name, email, avatar_color, user_email),
    )
    conn.commit()

    return {
      "message": "Profile updated successfully",
      "user": {
        "email": email,
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "avatar_color": avatar_color,
      }
    }
  finally:
    cursor.close()
    conn.close()
    
def change_user_password(
  user_email: str,
  current_password: str,
  new_password: str
):
  conn = get_db_connection()
  cursor = conn.cursor()
  
  try:
    current_password = current_password.strip()
    new_password = new_password.strip()

    if not current_password or not new_password:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="All fields are required"
      )
      
    if len(new_password) < 8:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="New password must be at least 8 characters long"
      )
      
    cursor.execute(
      """
      SELECT master_pass
      FROM users
      WHERE email = %s
      """,
      (user_email,),
    )
    user = cursor.fetchone()

    if user is None:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="User not found"
      )
    stored_hashed_password = user[0]
    
    if not verify_password(current_password, stored_hashed_password):
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Current password is incorrect"
      )
      
    new_hashed_password = hash_password(new_password)
    
    if current_password == new_password:
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="New password must be different from current password"
      )
    
    cursor.execute(
      """
      UPDATE users
      SET master_pass = %s
      WHERE email = %s
      """,
      (new_hashed_password, user_email)
    )
    conn.commit()

    return {
      "message": "Password updated successfully"
    }
    
  finally:
    cursor.close()
    conn.close()