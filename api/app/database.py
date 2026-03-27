import psycopg2

def get_db_connection():
  return psycopg2.connect(
    host="localhost",
    database="password_manager",
    user="postgres",
    password="$bonfire$123"
  )