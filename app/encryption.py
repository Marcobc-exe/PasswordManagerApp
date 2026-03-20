import bcrypt

# Hash password
def hash_password(password: str):
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
  return hashed.decode()

# Verify password
def verify_password(password: str, hashed_password: str):
  return bcrypt.checkpw(password.encode(), hashed_password.encode())