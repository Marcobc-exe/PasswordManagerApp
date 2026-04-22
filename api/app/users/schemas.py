from pydantic import BaseModel, EmailStr

class UserProfileResponse(BaseModel):
  email: str
  username: str | None = None
  first_name: str | None = None
  last_name: str | None = None
  avatar_color: str | None = None
  
class UpdateUserProfileRequest(BaseModel):
  email: EmailStr
  username: str
  first_name: str
  last_name: str
  avatar_color: str

class UpdateUserProfileResponse(BaseModel):
  message: str
  user: UserProfileResponse
  
class ChangePasswordRequest(BaseModel):
  current_password: str
  new_password: str
  
class PasswordMessageResponse(BaseModel):
  message: str