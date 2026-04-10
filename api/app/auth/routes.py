from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.auth.schemas import RefreshTokenRequest, LogoutRequest
from app.auth.utils import (
  create_access_token,
  create_refresh_token,
  verify_refresh_token,
)
from app.auth.services import (
    authenticate_user,
    get_user_by_email,
    save_refresh_token,
    revoke_refresh_token,
    is_refresh_token_valid_in_db,
)
from app.auth.services import authenticate_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
  "/login",
  summary="User login",
  description="Authenticate user credentials and return access and refresh tokens."
)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
  user = authenticate_user(form_data.username, form_data.password)

  if not user:
    raise HTTPException(status_code=401, detail="Invalid credentials")

  access_token = create_access_token(data={"sub": user["email"]})
  refresh_token, refresh_expires_at = create_refresh_token(data={"sub": user["email"]})
  save_refresh_token(user["id"], refresh_token, refresh_expires_at)

  
  return {
    "access_token": access_token,
    "refresh_token": refresh_token,
    "token_type": "bearer",
  }


@router.post(
  "/refresh",
  summary="Refresh access token",
  description="Generate a new access token using a valid refresh token."
)
def refresh_token(data: RefreshTokenRequest):
  email = verify_refresh_token(data.refresh_token)

  if not is_refresh_token_valid_in_db(data.refresh_token):
    raise HTTPException(status_code=401, detail="Refresh token revoked or expired")

  user = get_user_by_email(email)

  if user is None:
    raise HTTPException(status_code=404, detail="User not found")

  revoke_refresh_token(data.refresh_token)

  new_access_token = create_access_token(data={"sub": user["email"]})
  new_refresh_token, refresh_expires_at = create_refresh_token(data={"sub": user["email"]})

  save_refresh_token(user["id"], new_refresh_token, refresh_expires_at)

  return {
    "access_token": new_access_token,
    "refresh_token": new_refresh_token,
    "token_type": "bearer",
  }
  

@router.post(
  "/logout",
  summary="Logout user",
  description="Revoke the refresh token and terminate the session."
)
def logout(data: LogoutRequest):
  if not data.refresh_token:
    raise HTTPException(status_code=400, detail="Refresh token is required")

  revoke_refresh_token(data.refresh_token)

  return {"message": "Logged out successfully"}