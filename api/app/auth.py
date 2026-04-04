import os
from jose import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
  print(oauth2_scheme)
  try:
    print(token)
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email = payload.get("sub")
    print(email)
    if email is None:
      raise HTTPException(status_code=401, detail="Invalid token")
    
    return email
  except:
    raise HTTPException(status_code=401, detail="Invalid token")

def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode.update({ "exp": expire, "type": "access" })

  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now(timezone.utc) + timedelta(days=7)
  to_encode.update({ "exp": expire, "type": "refresh" })

  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)