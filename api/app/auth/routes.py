from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.auth.schemas import RefreshTokenRequest
from app.auth.utils import (
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
)
from app.auth.services import authenticate_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
  user = authenticate_user(form_data.username, form_data.password)

  if not user:
    raise HTTPException(status_code=401, detail="Invalid credentials")

  access_token = create_access_token(data={"sub": user["email"]})
  refresh_token = create_refresh_token(data={"sub": user["email"]})

  return {
    "access_token": access_token,
    "refresh_token": refresh_token,
    "token_type": "bearer",
  }


@router.post("/refresh")
def refresh_token(data: RefreshTokenRequest):
  email = verify_refresh_token(data.refresh_token)

  new_access_token = create_access_token(data={"sub": email})

  return {
    "access_token": new_access_token,
    "token_type": "bearer",
  }