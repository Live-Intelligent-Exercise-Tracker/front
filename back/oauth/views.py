import requests
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models.auth_models import User
from oauth.models import OAuthProvider
from users.authentication import generate_access_token, generate_refresh_token

KAKAO_CLIENT_ID = settings.KAKAO_CLIENT_ID
KAKAO_REDIRECT_URI = settings.KAKAO_REDIRECT_URI
KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/token"
KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me"

class KakaoLoginView(APIView):
    def get(self, request):
        """카카오 OAuth 로그인 URL 생성"""
        kakao_login_url = f"https://kauth.kakao.com/oauth/authorize?client_id={KAKAO_CLIENT_ID}&redirect_uri={KAKAO_REDIRECT_URI}&response_type=code"
        return Response({"login_url": kakao_login_url}, status=status.HTTP_200_OK)

class KakaoCallbackView(APIView):
    def get(self, request):
        """카카오 OAuth 콜백 - 액세스 토큰 발급"""
        code = request.GET.get("code")
        if not code:
            return Response({"error": "Authorization code not provided"}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
        }

        token_response = requests.post(KAKAO_AUTH_URL, data=data)
        token_json = token_response.json()

        if "access_token" not in token_json:
            return Response({"error": "카카오 토큰 발급 실패", "details": token_json}, status=status.HTTP_400_BAD_REQUEST)

        access_token = token_json["access_token"]
        refresh_token = token_json.get("refresh_token", "")

        # 카카오 유저 정보 가져오기
        headers = {"Authorization": f"Bearer {access_token}"}
        user_info_response = requests.get(KAKAO_USER_INFO_URL, headers=headers)
        user_info_json = user_info_response.json()

        if "id" not in user_info_json:
            return Response({"error": "카카오 유저 정보 가져오기 실패", "details": user_info_json}, status=status.HTTP_400_BAD_REQUEST)

        kakao_id = user_info_json["id"]
        kakao_nickname = user_info_json.get("properties", {}).get("nickname", "카카오 사용자")

        # 기존 유저 확인
        oauth_user, created = OAuthProvider.objects.get_or_create(provider_id=str(kakao_id), defaults={
            "provider_name": "kakao",
            "access_token": access_token,
            "refresh_token": refresh_token,
        })

        if created:
            # 새로운 유저 생성
            user = User.objects.create(
                login_id=f"kakao_{kakao_id}",
                nickname=kakao_nickname,
                auth_provider="kakao"
            )
            oauth_user.user = user
            oauth_user.save()
        else:
            # 기존 유저
            user = oauth_user.user
            oauth_user.access_token = access_token
            oauth_user.refresh_token = refresh_token
            oauth_user.save()

        access_jwt = generate_access_token(user)
        refresh_jwt = generate_refresh_token(user)

        return Response({
            "message": "카카오 로그인 성공",
            "user_id": user.id,
            "nickname": user.nickname,
            "token": access_jwt,
            "refresh_token": refresh_jwt,
        }, status=status.HTTP_200_OK)
