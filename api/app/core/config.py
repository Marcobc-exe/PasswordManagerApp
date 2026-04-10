import os
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

CORS_ORIGINS = [
  FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://lockerpass.site",
  "https://www.lockerpass.site",
]