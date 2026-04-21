import psycopg2

from app.database import get_db_connection
from app.encryption import hash_password
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
      SELECT email, username, first_name, last_name
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
      
    email, username, first_name, last_name = user

    return {
      "email": email,
      "username": username,
      "first_name": first_name,
      "last_name": last_name
    }
    
  finally:
    cursor.close()
    conn.close()