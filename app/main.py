from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
  return {"message": "Password manager API working!"}