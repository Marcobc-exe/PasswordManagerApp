"""
Main module to run the password manager application
"""
from fastapi import FastAPI
from app.database import get_db_connection
from app.encryption import hash_password

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Password Manager API is running"}

"""
Connection to db, running app
"""
@app.post("/register")
def register_user(email: str, password: str):
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