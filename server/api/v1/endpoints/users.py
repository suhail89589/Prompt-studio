from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from server.db.Session import get_db
from server.schemas.user import UserCreate, UserResponse
from server.config.security import get_password_hash
from server.crud.user import get_user_by_email, create_user_db # Assume you add this helper

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
   
    existing_user = get_user_by_email(db, email=user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    

    hashed_password = get_password_hash(user_data.password)
    
    
    new_user = create_user_db(db, user_data, hashed_password)
    
    return new_user