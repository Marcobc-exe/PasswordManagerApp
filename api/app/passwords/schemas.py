from pydantic import BaseModel

class PasswordItemResponse(BaseModel):
  id: int
  website: str
  username: str
  password: str
  favorite: bool = False

class PasswordMessageResponse(BaseModel):
  message: str
  
class ToggleFavoriteResponse(BaseModel):
  message: str
  favorite: bool