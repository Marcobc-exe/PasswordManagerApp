from pydantic import BaseModel

class PasswordItemResponse(BaseModel):
  id: int
  website: str
  username: str
  password: str

class PasswordMessageResponse(BaseModel):
  message: str