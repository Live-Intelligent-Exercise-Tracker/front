import requests
from django.conf import settings

KAKAO_CLIENT_ID = settings.KAKAO_CLIENT_ID
KAKAO_REDIRECT_URI = settings.KAKAO_REDIRECT_URI
KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token"
KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me"

def get_kakao_access_token(auth_code):
    """Authorization Code를 이용해 Access Token 요청"""
    data = {
        "grant_type": "authorization_code",
        "client_id": KAKAO_CLIENT_ID,
        "redirect_uri": KAKAO_REDIRECT_URI,
        "code": auth_code,
    }
    response = requests.post(KAKAO_TOKEN_URL, data=data)
    
    if response.status_code != 200:
        return None, response.json()

    return response.json().get("access_token"), None

def get_kakao_user_info(access_token):
    """Access Token을 이용해 사용자 정보 요청"""
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(KAKAO_USER_INFO_URL, headers=headers)

    if response.status_code != 200:
        return None, response.json()

    return response.json(), None
