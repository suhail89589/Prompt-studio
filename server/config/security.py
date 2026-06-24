from passlib.context import CryptoContext

pwd_context = CryptoContext(schemas=["bcrypt"], deprecated="auto")

def get_password_hash(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password:str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)