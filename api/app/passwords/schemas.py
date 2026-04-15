from pydantic import BaseModel
from datetime import datetime

class PasswordItemResponse(BaseModel):
  id: int
  website: str
  username: str
  password: str
  favorite: bool = False
  created_at: datetime

class PasswordMessageResponse(BaseModel):
  message: str
  
class ToggleFavoriteResponse(BaseModel):
  message: str
  favorite: bool