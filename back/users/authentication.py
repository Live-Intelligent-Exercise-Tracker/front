from rest_framework.authentication import BaseAuthentication
import jwt
import datetime
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from users.models.auth_models import User

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
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=settings.REFRESH_TOKEN_LIFETIME),
        "iat": datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

class CustomJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        try:
            prefix, token = auth_header.split(" ")
            if prefix.lower() != "bearer":
                return None

            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            if not user_id:
                raise AuthenticationFailed("Token has no user_id")

            user = User.objects.get(id=user_id)
            return (user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")