from fastapi import FastAPI
from app.database import get_db_connection

app = FastAPI()

@app.get('/')
def home():
  conn = get_db_connection()
  conn.close()
  return { "message": "Connected to PostgreSQL successfully!" }