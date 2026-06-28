from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.db.Session import get_db
from server.schemas.user import UserCreate , UserResponse
from server.services.auth_service import register_user
from server.services.auth_service import authenticate_user
from fastapi.security import OAuth2PasswordRequestForm
from server.config.security import create_access_token
from server.api.deps import get_current_user


router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm= Depends(), db: Session=Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub":user.email})
    return {"access_token":access_token, "token_type":"bearer"}

@router.get("/me")
def get_me(current_user: str = Depends(get_current_user)):
    return {"user_email": current_user}