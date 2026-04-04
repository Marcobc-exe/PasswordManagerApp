from database import get_db_connection
from app.encryption import decrypt_website_password

def authenticate_user(email: str, password: str):
  conn = get_db_connection
  cursor = conn.cursor()
  
  try:
    cursor.execute(
      "SELECT email, master_pass FROM users WHERE email = %s",
      (email,)
    )
    user = cursor.fetchone()

    if user is None:
      return None

    db_email, db_password = user

    if not decrypt_website_password(password, db_password):
      return None

    return {"email": db_email}
  except Exception as exc:
    print(f"Error occurred while authenticating user: {exc}")
    user = None
  finally:
    cursor.close()
    conn.close()
    