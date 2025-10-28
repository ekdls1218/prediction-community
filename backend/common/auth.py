import os 
import jwt
from fastapi import Header, HTTPException

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGO = os.getenv("JWT_ALGO")

def decode_token(token):
        try:
            return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO or "HS256"])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="토큰 만료")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="유효하지 않은 토큰")


def get_user_id_from_header(authorization: str = Header(None)):
        if not authorization:
            raise HTTPException(status_code=401, detail="No token provided")
        tokens = authorization.split(" ")
        if len(tokens) != 2 or tokens[0].lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth header")
        payload = decode_token(tokens[1])
        return payload["id"]


    