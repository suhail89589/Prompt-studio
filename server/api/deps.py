from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from server.config.config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email:str=payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid Token")
        return email
    except Exception:
        raise HTTPException(status_code=401, detail="Could not validate credentials")