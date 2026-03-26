"""
Main module to run the password manager application
"""
from fastapi import FastAPI
from app.database import get_db_connection
from app.encryption import hash_password, verify_password, encrypt_website_password, decrypt_website_password

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

@app.post('/login')
def login_user(email: str, password: str):
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
  print(user)
  hashed_password = user[0]

  if verify_password(password, hashed_password):
    return { "message": "Login successful" }
  
  return { "error" : "Incorrect password"}

@app.post("/save-password")
def save_password(user_email: str, website: str, username: str, password: str):
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
def get_passwords(user_email: str):
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
    "SELECT website, username, password FROM passwords WHERE user_id = %s",
    (user_id,)
  )
  
  results = cursor.fetchall()
  cursor.close()
  conn.close()
  
  data = []

  for website, username, encrypted_password in results:
    decrypted = decrypt_website_password(encrypted_password)

    data.append({
      "website" : website,
      "username": username,
      "password": decrypted
    })
  
  return data