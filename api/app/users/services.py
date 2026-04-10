import psycopg2

from app.database import get_db_connection
from app.encryption import hash_password

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