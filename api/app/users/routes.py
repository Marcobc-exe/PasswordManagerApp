import psycopg2
from fastapi import APIRouter, Form, HTTPException, status, Depends

from app.users.services import create_user, get_user_profile
from app.users.schemas import UserProfileResponse
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