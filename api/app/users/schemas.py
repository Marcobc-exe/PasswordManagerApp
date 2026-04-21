from pydantic import BaseModel

class UserProfileResponse(BaseModel):
  email: str
  username: str | None = None
  first_name: str | None = None
  last_name: str | None = None