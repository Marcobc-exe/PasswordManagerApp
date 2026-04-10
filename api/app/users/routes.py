import psycopg2
from fastapi import APIRouter, Form, HTTPException, status

from app.users.services import create_user

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