import bcrypt

# Hashing the password using bcrypt
def hash_password(password: str):
  return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password: str, hashed_password: bytes):
  return bcrypt.checkpw(password.encode(), hashed_password)