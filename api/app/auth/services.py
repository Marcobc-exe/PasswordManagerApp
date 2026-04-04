from app.database import get_db_connection
from app.encryption import verify_password

def authenticate_user(email: str, password: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      "SELECT email, master_pass FROM users WHERE email = %s",
      (email,)
    )
    user = cursor.fetchone()

    if user is None:
      return None

    db_email, hashed_password = user

    if not verify_password(password, hashed_password):
      return None

    return {"email": db_email}

  finally:
    cursor.close()
    conn.close()