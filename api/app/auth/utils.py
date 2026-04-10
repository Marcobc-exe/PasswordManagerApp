from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException

from app.core.config import (
  SECRET_KEY,
  ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES,
  REFRESH_TOKEN_EXPIRE_DAYS
)

load_dotenv()

"""
  Generate a short-lived JWT access token.
"""
def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire, "type": "access"})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

"""
  Generate a long-lived JWT refresh token.
"""
def create_refresh_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
  to_encode.update({"exp": expire, "type": "refresh"})
  token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return token, expire

"""
  Validate and decode a refresh token.
"""
def verify_refresh_token(refresh_token: str):
  try:
    payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])

    email = payload.get("sub")
    token_type = payload.get("type")

    if email is None:
      raise HTTPException(status_code=401, detail="Invalid token payload")

    if token_type != "refresh":
      raise HTTPException(status_code=401, detail="Invalid token type")

    return email

  except JWTError:
    raise HTTPException(status_code=401, detail="Invalid or expired refresh token")