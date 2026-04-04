"""
Main module to run the password manager application
"""
import os
import psycopg2
from dotenv import load_dotenv
from app.database import get_db_connection
from fastapi.middleware.cors import CORSMiddleware
from fastapi_swagger_ui_theme import setup_swagger_ui_theme
from fastapi import FastAPI, Depends, Form, HTTPException, status
from app.encryption import hash_password, encrypt_website_password, decrypt_website_password
from app.auth import get_current_user
from app.auth.routes import router as auth_router

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

origins = [
  FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://lockerpass.site",
  "https://www.lockerpass.site",
]

app = FastAPI(docs_url=None)
app.include_router(auth_router)
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
@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
  email: str = Form(...),
  password: str = Form(...)
):
  conn = get_db_connection()
  cursor = conn.cursor()

  try:
    hashed = hash_password(password)

    cursor.execute(
      "INSERT INTO users (email, master_pass) VALUES (%s, %s)",
      (email, hashed)
    )
    
    conn.commit()
    
    return {
      "message": "User registered successfully!"
    }
  except psycopg2.IntegrityError as exc:
    conn.rollback()
    raise HTTPException(
      status_code=status.HTTP_409_CONFLICT,
      detail="Email already registered"
    ) from exc
  except Exception as exc:
    conn.rollback()
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
  finally:
    cursor.close()
    conn.close()

@app.post("/save-password")
def save_password(
  website: str = Form(...),
  username: str = Form(...),
  password: str = Form(...),
  user_email: str = Depends(get_current_user),
):
  website = website.strip()
  username = username.strip()
  password = password.strip()

  if not website or not username or not password:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="All fields are required"
    )
    
  conn = get_db_connection()
  cursor = conn.cursor()
  
  try:
    cursor.execute("SELECT id FROM users WHERE email = %s",(user_email,))
    user = cursor.fetchone()

    if user is None:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
      )

    user_id = user[0]
    encrypted = encrypt_website_password(password)

    cursor.execute(
      "INSERT INTO passwords (user_id, website, username, password) VALUES (%s, %s, %s, %s)",
      (user_id, website, username, encrypted)
    )
    conn.commit()

    return { "message": "Password saved securely" }
  
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
  finally:
    cursor.close()
    conn.close()

@app.get("/get-passwords")
def get_passwords(user_email: str = Depends(get_current_user)):
  conn = get_db_connection()
  cursor = conn.cursor()
  
  try:
    cursor.execute(
      "SELECT id FROM users WHERE email =  %s",
      (user_email,)
    )
    
    user = cursor.fetchone()
    
    if user is None:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
      )

    user_id = user[0]

    cursor.execute(
      "SELECT id, website, username, password FROM passwords WHERE user_id = %s",
      (user_id,)
    )
    
    results = cursor.fetchall()
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

  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
  finally:
    cursor.close()
    conn.close()

@app.delete('/delete-password/{password_id}')
def delete_password(password_id: int, user_email: str = Depends(get_current_user)):
  conn = get_db_connection()
  cursor = conn.cursor()
  
  try:
    cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
    user = cursor.fetchone()
    
    if user is None:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
      )
    
    user_id = user[0]

    cursor.execute(
      "DELETE FROM passwords WHERE id = %s AND user_id = %s",
      (password_id, user_id)
    )
    conn.commit()
    
    return { "message": "Password deleted successfully" }
    
  except HTTPException as exc:
    raise exc
  except Exception as exc:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Unexpected server error"
    ) from exc
  finally:
    cursor.close()
    conn.close()

