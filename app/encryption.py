import bcrypt
from cryptography.fernet import Fernet

# Hash password
def hash_password(password: str):
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
  return hashed.decode()

# Verify password
def verify_password(password: str, hashed_password: str):
  return bcrypt.checkpw(password.encode(), hashed_password.encode())

# Generate encryption key
key = Fernet.generate_key()
cipher = Fernet(key)

def encrypt_website_password(password: str):
  return cipher.encrypt(password.encode()).decode()

def decrypt_website_password(encrypted_password: str):
  return cipher.decrypt(encrypted_password.encode()).decode()