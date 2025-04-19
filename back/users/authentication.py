import jwt
import datetime
from django.conf import settings

def generate_access_token(user):
    payload = {
        "user_id": user.id,
        "email": user.email,  
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=settings.ACCESS_TOKEN_LIFETIME),
        "iat": datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token

def generate_refresh_token(user):
    payload = {
        "email": user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=settings.REFRESH_TOKEN_LIFETIME),
        "iat": datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")