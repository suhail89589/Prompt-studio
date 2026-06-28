from sqlalchemy.orm import Session
from fastapi import HTTPException , status
from server.models.user import User
from server.config.security import get_password_hash, verify_password
from server.schemas.user import UserCreate


def register_user(db:Session, user_data:UserCreate):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed_pw = get_password_hash(user_data.password)
    db_user = User(email=user_data.email, hashed_password=hashed_pw)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user  or not verify_password(password, user.hashed_password):
        return None
    return user