import os
import bcrypt
from cryptography.fernet import Fernet, MultiFernet
from dotenv import load_dotenv

load_dotenv()

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
# Only set during a key rotation, so data encrypted with the old key can still be read
OLD_ENCRYPTION_KEY = os.getenv("OLD_ENCRYPTION_KEY")

if not ENCRYPTION_KEY:
  raise ValueError("ENCRYPTION_KEY is not set")

# The first key encrypts; every key in the list can decrypt
keys = [Fernet(ENCRYPTION_KEY.encode())]
if OLD_ENCRYPTION_KEY:
  keys.append(Fernet(OLD_ENCRYPTION_KEY.encode()))
cipher = MultiFernet(keys)

# Hash password
def hash_password(password: str):
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
  return hashed.decode()

# Verify password
def verify_password(password: str, hashed_password: str):
  try:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())
  except ValueError:
    return False

def encrypt_website_password(password: str):
  return cipher.encrypt(password.encode()).decode()

def decrypt_website_password(encrypted_password: str):
  return cipher.decrypt(encrypted_password.encode()).decode()

# Re-encrypt a value with the current key (used once when rotating keys)
def rotate_website_password(encrypted_password: str):
  return cipher.rotate(encrypted_password.encode()).decode()
