import bcrypt
from cryptography.fernet import Fernet

# Generate encryption key
key = Fernet.generate_key()
cipher = Fernet(key)
SECRET_KEY = "LrXrVuraYI0sCnvG_tBkke-yZ39VAYbTZg8eglTBqh4="
cipher = Fernet(SECRET_KEY.encode())

# Hash password
def hash_password(password: str):
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
  return hashed.decode()

# Verify password
def verify_password(password: str, hashed_password: str):
  return bcrypt.checkpw(password.encode(), hashed_password.encode())

def encrypt_website_password(password: str):
  return cipher.encrypt(password.encode()).decode()

def decrypt_website_password(encrypted_password: str):
  return cipher.decrypt(encrypted_password.encode()).decode()