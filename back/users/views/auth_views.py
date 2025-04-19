from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.hashers import make_password
from django.core.cache import cache
from django.conf import settings
import jwt

from users.models.auth_models import User
from users.models.biodata_models import UserBiodata
from users.authentication import generate_access_token, generate_refresh_token

# 회원가입 뷰
class RegisterView(APIView):
    permission_classes = [AllowAny]

    #Client 상에서 아래와 같은 데이터들을 받습니다.
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        nickname = request.data.get("nickname")
        age = request.data.get("age")
        height = request.data.get("height")
        weight = request.data.get("weight")
        gender = request.data.get("gender")
        resting_hr = request.data.get("resting_hr")

        required_fields = {
            "email": ("이메일", email),
            "password": ("비밀번호", password),
            "nickname": ("닉네임", nickname),
            "age": ("나이", age),
            "height": ("키", height),
            "weight": ("몸무게", weight),
            "gender": ("성별", gender),
        }

        # 비어있는 필드 추출 -> client 상에서 비어 있는 부분을 채우기 위함.
        missing = [label for field, (label, value) in required_fields.items() if value in [None, ""]]

        if missing:
            return Response(
                {"message": f"{', '.join(missing)} 항목을 입력해주세요."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response({"message": "이미 존재하는 이메일입니다."},
                            status=status.HTTP_409_CONFLICT)

        if User.objects.filter(nickname=nickname).exists():
            return Response({"message": "이미 존재하는 닉네임입니다."},
                            status=status.HTTP_409_CONFLICT)

        try:
            user = User.objects.create(
                email=email,
                nickname=nickname,
                password=make_password(password),
                auth_provider="self"
            )
            UserBiodata.objects.create(
                user=user,
                gender=gender,
                age=age,
                height=height,
                weight=weight,
                resting_hr=resting_hr
            )
            return Response({"message": "회원가입 성공", "user_id": user.id},
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": f"서버 오류: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# 이메일 중복 체크 뷰
class CheckEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"message": "이메일을 입력해주세요."},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"message": "이미 존재하는 이메일입니다."},
                            status=status.HTTP_409_CONFLICT)

        return Response({"message": "사용 가능한 이메일입니다."},
                        status=status.HTTP_200_OK)

# 닉네임 중복 체크 뷰
class CheckNicknameView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        nickname = request.data.get("nickname")
        if not nickname:
            return Response({"message": "닉네임을 입력해주세요."},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(nickname=nickname).exists():
            return Response({"message": "이미 존재하는 닉네임입니다."},
                            status=status.HTTP_409_CONFLICT)

        return Response({"message": "사용 가능한 닉네임입니다."},
                        status=status.HTTP_200_OK)

# 로그인 뷰
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"message": "아이디와 비밀번호를 입력하세요."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "존재하지 않는 아이디입니다."},
                            status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({"message": "비밀번호가 일치하지 않습니다."},
                            status=status.HTTP_400_BAD_REQUEST)

        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)

        return Response(
            {
            "message": "로그인 성공",
            "user_id": user.id,
            "email": user.email,
            "nickname": user.nickname,
            "token": access_token,
            "refresh_token": refresh_token
            }, 
        status=status.HTTP_200_OK
        )

# 로그아웃 뷰
class LogoutView(APIView):
    # permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.data.get("refresh_token")

        if not refresh_token:
            return Response({"message": "Refresh Token이 필요합니다."},
                            status=status.HTTP_400_BAD_REQUEST)

        cache.set(refresh_token, "blacklisted", timeout=86400)  # 24시간 블랙리스트
        return Response({"message": "로그아웃 성공"},
                        status=status.HTTP_200_OK)

# RefreshToken 재발급 뷰
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({"message": "Refresh Token이 필요합니다."},
                            status=status.HTTP_400_BAD_REQUEST)

        if cache.get(refresh_token) == "blacklisted":
            return Response({"message": "유효하지 않은 Refresh Token입니다."},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload.get("user_id"))
            access_token = generate_access_token(user)
            return Response({"message": "토큰 재발급 성공", "token": access_token},
                            status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({"message": "Refresh Token이 만료되었습니다."},
                            status=status.HTTP_401_UNAUTHORIZED)
        except (jwt.InvalidTokenError, User.DoesNotExist):
            return Response({"message": "유효하지 않은 요청입니다."},
                            status=status.HTTP_401_UNAUTHORIZED)

# 계정 조회 뷰 (프로필 조회)
class AuthProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        biodata = UserBiodata.objects.filter(user=user).first()
        biodata_response = {
            "gender": biodata.gender,
            "age": biodata.age,
            "height": biodata.height,
            "weight": biodata.weight,
            "resting_hr": biodata.resting_hr
        } if biodata else {}

        return Response({
            "user_id": user.id,
            "nickname": user.nickname,
            "email": user.email,
            "biodata": biodata_response
        }, status=status.HTTP_200_OK)
