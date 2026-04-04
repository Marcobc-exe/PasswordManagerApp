import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire, "type": "access"})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
  to_encode.update({"exp": expire, "type": "refresh"})
  token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return token, expire


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