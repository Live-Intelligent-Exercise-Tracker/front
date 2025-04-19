from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from users.models.auth_models import User
class KakaoLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.kakao_login_url = "/api/auth/kakao/"
        self.mock_auth_code = "test_auth_code"

    @patch("oauth.kakao.get_kakao_access_token")
    @patch("oauth.kakao.get_kakao_user_info")
    def test_kakao_login_success(self, mock_get_user_info, mock_get_access_token):
        """카카오 로그인 성공 테스트"""

        # Mock API 응답 설정
        mock_get_access_token.return_value = ("test_access_token", None)
        mock_get_user_info.return_value = ({
            "id": 12345678,
            "kakao_account": {
                "profile": {"nickname": "kakao_test_user"}
            }
        }, None)

        # API 요청 실행
        response = self.client.post(self.kakao_login_url, {"auth_code": self.mock_auth_code}, format="json")

        # 응답 확인
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertIn("refresh_token", response.data)
        self.assertEqual(response.data["username"], "kakao_test_user")

    @patch("oauth.kakao.get_kakao_access_token")
    def test_kakao_login_fail_invalid_code(self, mock_get_access_token):
        """잘못된 Authorization Code로 로그인 실패"""
        mock_get_access_token.return_value = (None, "Invalid authorization code")

        response = self.client.post(self.kakao_login_url, {"auth_code": "wrong_code"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_kakao_login_fail_no_code(self):
        """Authorization Code 없이 요청 시 실패"""
        response = self.client.post(self.kakao_login_url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
