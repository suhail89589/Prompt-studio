from fastapi import FastAPI
from server.api.routes import auth

app = FastAPI()

app.include_router(auth.router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Prompt Studio API is running"}