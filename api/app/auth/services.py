from datetime import datetime, timezone
from app.database import get_db_connection
from app.encryption import verify_password


def authenticate_user(email: str, password: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      "SELECT id, email, master_pass FROM users WHERE email = %s",
      (email,)
    )
    user = cursor.fetchone()

    if user is None:
      return None

    user_id, db_email, hashed_password = user

    if not verify_password(password, hashed_password):
      return None

    return {
      "id": user_id,
      "email": db_email,
    }

  finally:
    cursor.close()
    conn.close()


def get_user_by_email(email: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      "SELECT id, email FROM users WHERE email = %s",
      (email,)
    )
    user = cursor.fetchone()

    if user is None:
      return None

    return {
      "id": user[0],
      "email": user[1],
    }

  finally:
    cursor.close()
    conn.close()


def save_refresh_token(user_id: int, token: str, expires_at):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (%s, %s, %s)",
      (user_id, token, expires_at)
    )
    conn.commit()
  finally:
    cursor.close()
    conn.close()


def find_refresh_token(token: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      """
      SELECT id, user_id, token, expires_at, revoked
      FROM refresh_tokens
      WHERE token = %s
      """,
      (token,)
    )
    row = cursor.fetchone()

    if row is None:
      return None

    return {
      "id": row[0],
      "user_id": row[1],
      "token": row[2],
      "expires_at": row[3],
      "revoked": row[4],
    }

  finally:
    cursor.close()
    conn.close()


def revoke_refresh_token(token: str):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    cursor.execute(
      """
      UPDATE refresh_tokens
      SET revoked = TRUE
      WHERE token = %s
      """,
      (token,)
    )
    conn.commit()
  finally:
    cursor.close()
    conn.close()


def is_refresh_token_valid_in_db(token: str):
  saved_token = find_refresh_token(token)

  if saved_token is None:
    return False

  if saved_token["revoked"]:
    return False

  expires_at = saved_token["expires_at"]

  if expires_at.tzinfo is None:
    expires_at = expires_at.replace(tzinfo=timezone.utc)

  if expires_at <= datetime.now(timezone.utc):
    return False

  return True