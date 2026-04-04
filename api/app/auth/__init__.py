from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.auth.utils import (
    ALGORITHM,
    SECRET_KEY,
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
)
from app.auth.services import authenticate_user

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email = payload.get("sub")
    token_type = payload.get("type")

    if email is None:
      raise HTTPException(status_code=401, detail="Invalid token")

    if token_type != "access":
      raise HTTPException(status_code=401, detail="Invalid token type")

    return email

  except JWTError:
    raise HTTPException(status_code=401, detail="Invalid token")


__all__ = [
  "authenticate_user",
  "create_access_token",
  "create_refresh_token",
  "verify_refresh_token",
  "get_current_user",
  "oauth2_scheme",
]