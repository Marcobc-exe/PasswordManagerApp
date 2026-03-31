"""
Main module to run the password manager application
"""
from fastapi import FastAPI, Depends, Form
from fastapi_swagger_ui_theme import setup_swagger_ui_theme
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_db_connection
from app.encryption import hash_password, verify_password, encrypt_website_password, decrypt_website_password
from app.auth import create_access_token, get_current_user
import os
from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
origins = [
  FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]

app = FastAPI(docs_url=None)
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
setup_swagger_ui_theme(app, docs_path="/docs", title="My Password Manage API docs")

@app.get("/")
def home():
    return {"message": "Password Manager API is running"}

"""
Connection to db, running app
"""
@app.post("/register")
def register_user(
  email: str = Form(...),
  password: str = Form(...)
):
  conn = get_db_connection()
  cursor = conn.cursor()

  hashed = hash_password(password)

  cursor.execute(
    "INSERT INTO users (email, master_pass) VALUES (%s, %s)",
    (email, hashed)
  )
  
  conn.commit()
  cursor.close()
  conn.close()

  return {
    "message": "User registered successfully!"
  }

@app.post('/login')
def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
  email = form_data.username
  password = form_data.password
  conn = get_db_connection()
  cursor = conn.cursor()

  cursor.execute(
    'SELECT master_pass FROM users WHERE email = %s',
    (email,)
  )
  
  user = cursor.fetchone()
  cursor.close()
  conn.close()

  if user is None:
    return { "error": "User not found" }

  hashed_password = user[0]

  if verify_password(password, hashed_password):
    token = create_access_token({"sub": email})

    return {
      "access_token": token,
      "token_type": "bearer",
    }
  
  return { "error" : "Incorrect password"}

# In the frontend, logout just delete the token from localStorage
@app.post('/logout')
def logout():
  return { "message": "User logged out successfully" }

@app.post("/save-password")
def save_password(
  website: str = Form(...),
  username: str = Form(...),
  password: str = Form(...),
  user_email: str = Depends(get_current_user),
):
  conn = get_db_connection()
  cursor = conn.cursor()
  
  cursor.execute("SELECT id FROM users WHERE email = %s",(user_email,))
  user = cursor.fetchone()

  if user is None:
    return { "error": "User not found" }

  user_id = user[0]
  encrypted = encrypt_website_password(password)

  cursor.execute(
    "INSERT INTO passwords (user_id, website, username, password) VALUES (%s, %s, %s, %s)",
    (user_id, website, username, encrypted)
  )
  
  conn.commit()
  cursor.close()
  conn.close()

  return { "message": "Password saved securely" }

@app.get("/get-passwords")
def get_passwords(user_email: str = Depends(get_current_user)):
  conn = get_db_connection()
  cursor = conn.cursor()

  cursor.execute(
    "SELECT id FROM users WHERE email =  %s",
    (user_email,)
  )
  
  user = cursor.fetchone()
  
  if user is None:
    return { "Error": "User not found" }

  user_id = user[0]

  cursor.execute(
    "SELECT id, website, username, password FROM passwords WHERE user_id = %s",
    (user_id,)
  )
  
  results = cursor.fetchall()
  cursor.close()
  conn.close()
  data = []

  for id, website, username, encrypted_password in results:
    decrypted = decrypt_website_password(encrypted_password)

    data.append({
      "id": id,
      "website" : website,
      "username": username,
      "password": decrypted
    })
  
  return data

@app.delete('/delete-password/{password_id}')
def delete_password(password_id: int, user_email: str = Depends(get_current_user)):
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
  user = cursor.fetchone()

  if user is None:
    return { "error": "User not found" }

  user_id = user[0]

  cursor.execute(
    "DELETE FROM passwords WHERE id = %s AND user_id = %s",
    (password_id, user_id)
  )

  conn.commit()
  cursor.close()
  conn.close()

  return { "message": "Password deleted successfully" }