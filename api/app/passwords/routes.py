from fastapi import APIRouter, Depends, Form, HTTPException, status

from app.passwords.schemas import PasswordItemResponse, PasswordMessageResponse
from app.auth import get_current_user
from app.passwords.services import (
  create_password_entry,
  delete_password_entry,
  get_password_entries,
)

router = APIRouter(prefix="/passwords", tags=["Passwords"])

"""
  Create a new password entry for the authenticated user.
"""
@router.post(
  "/",
  summary="Create password",
  description="Store a new encrypted password for the authenticated user.",
  response_model=PasswordMessageResponse,
  status_code=status.HTTP_201_CREATED
)
def save_password(
  website: str = Form(...),
  username: str = Form(...),
  password: str = Form(...),
  user_email: str = Depends(get_current_user),
):
  try:
    return create_password_entry(user_email, website, username, password)
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error",
    ) from exc

"""
  Retrieve all stored passwords for the authenticated user.
"""
@router.get(
  "/",
  summary="Get passwords",
  description="Retrieve all stored passwords for the authenticated user.",
  response_model=list[PasswordItemResponse]
)
def get_passwords(user_email: str = Depends(get_current_user)):
  try:
    return get_password_entries(user_email)
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error",
    ) from exc

"""
  Delete a specific password entry by ID for the authenticated user.
"""
@router.delete(
  "/{password_id}",
  summary="Delete password",
  description="Delete a password entry by its ID for the authenticated user.",
  response_model=PasswordMessageResponse
)
def delete_password(password_id: int, user_email: str = Depends(get_current_user)):
  try:
    return delete_password_entry(user_email, password_id)
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error",
    ) from exc