from fastapi import HTTPException, status

from app.database import get_db_connection
from app.encryption import encrypt_website_password, decrypt_website_password

"""
  Fetch the user ID associated with the given email.
  Raises 404 if the user does not exist
"""
def get_user_id_by_email(cursor, user_email: str):
  cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
  user = cursor.fetchone()

  if user is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="User not found",
    )

  return user[0]

"""
  Create and store an encrypted password entry for the user.
"""
def create_password_entry(user_email: str, website: str, username: str, password: str):
  website = website.strip()
  username = username.strip()
  password = password.strip()

  if not website or not username or not password:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="All fields are required",
    )

  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    user_id = get_user_id_by_email(cursor, user_email)
    encrypted_password = encrypt_website_password(password)

    cursor.execute(
      """
      INSERT INTO passwords (user_id, website, username, password)
      VALUES (%s, %s, %s, %s)
      """,
      (user_id, website, username, encrypted_password),
    )
    conn.commit()

    return {"message": "Password saved securely"}

  finally:
    cursor.close()
    conn.close()

"""
  Retrieve and decrypt all password entries for the user.
"""
def get_password_entries(user_email: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    user_id = get_user_id_by_email(cursor, user_email)

    cursor.execute(
      "SELECT id, website, username, password FROM passwords WHERE user_id = %s",
      (user_id,),
    )
    
    results = cursor.fetchall()

    data = []
    
    for password_id, website, username, encrypted_password in results:
      data.append(
        {
          "id": password_id,
          "website": website,
          "username": username,
          "password": decrypt_website_password(encrypted_password),
        }
      )

    return data

  finally:
    cursor.close()
    conn.close()

"""
  Delete a password entry belonging to the user.
"""
def delete_password_entry(user_email: str, password_id: int):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    user_id = get_user_id_by_email(cursor, user_email)

    cursor.execute(
      "DELETE FROM passwords WHERE id = %s AND user_id = %s",
      (password_id, user_id),
    )
    conn.commit()

    return {"message": "Password deleted successfully"}

  finally:
    cursor.close()
    conn.close()