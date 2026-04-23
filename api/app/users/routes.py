import psycopg2
from fastapi import APIRouter, Form, HTTPException, status, Depends

from app.users.services import create_user, get_user_profile, update_user_profile, change_user_password, delete_user_account
from app.users.schemas import UserProfileResponse, UpdateUserProfileRequest, UpdateUserProfileResponse, PasswordMessageResponse, ChangePasswordRequest, MessageResponse, DeleteUserRequest
from app.auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

"""
  Register a new user with email and password.
"""
@router.post(
  "/register", 
  summary="Register user",
  description="Create a new user account with email and password.",
  status_code=status.HTTP_201_CREATED,
)
def register_user(
  email: str = Form(...),
  password: str = Form(...),
):
  try:
    return create_user(email, password)

  except psycopg2.IntegrityError as exc:
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="Email already registered",
    ) from exc

  except HTTPException as exc:
    raise exc

  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error",
    ) from exc
    
@router.get(
  "/me",
  summary="Get current user",
  description="Retrieve the authenticated user's profile information.",
  response_model=UserProfileResponse,
)
def get_current_user_profile(user_email: str = Depends(get_current_user)):
  try:
    return get_user_profile(user_email)
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error",
    ) from exc
    
@router.patch(
  "/me",
  summary="Update current user profile",
  description="Update the authenticated user's profile information.",
  response_model=UpdateUserProfileResponse
)
def update_current_user_profile(
  payload: UpdateUserProfileRequest,
  user_email: str = Depends(get_current_user)
):
  try:
    return update_user_profile(
      user_email=user_email,
      username=payload.username,
      first_name=payload.first_name,
      last_name=payload.last_name,
      email=payload.email,
      avatar_color=payload.avatar_color
    )
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
    
@router.patch(
  "/me/password",
  summary="Change current user password",
  description="Update the authenticated user's password.",
  response_model=PasswordMessageResponse
)
def update_current_user_password(
  payload: ChangePasswordRequest,
  user_email: str = Depends(get_current_user)
):
  
  try:
    return change_user_password(
      user_email=user_email,
      current_password=payload.current_password,
      new_password=payload.new_password,
    )
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
    
@router.delete(
  "/me",
  summary="Delete current user account",
  description="Delete the authenticated user's account after password confirmation.",
  response_model=MessageResponse
)
def delete_current_user_account(
  payload: DeleteUserRequest,
  user_email: str = Depends(get_current_user)
):
  try:
    return delete_user_account(
      user_email=user_email,
      current_password=payload.current_password
    )
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc