"""
Main module to run the password manager application
"""
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_swagger_ui_theme import setup_swagger_ui_theme

from app.auth.routes import router as auth_router
from app.users.routes import router as users_router
from app.passwords.routes import router as passwords_router
from app.core.config import CORS_ORIGINS

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI(docs_url=None)

app.add_middleware(
  CORSMiddleware,
  allow_origins=CORS_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

setup_swagger_ui_theme(app, docs_path="/docs", title="My Password Manage API docs")

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(passwords_router)

@app.get("/")
def home():
  return {"message": "Password Manager API is running"}
