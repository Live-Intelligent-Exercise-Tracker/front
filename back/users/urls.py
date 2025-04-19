from django.urls import path
from users.views.auth_views import LoginView, RegisterView, LogoutView, RefreshTokenView,CheckEmailView, CheckNicknameView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
    path("refresh/", RefreshTokenView.as_view(), name="token-refresh"),
    path('checkemail/', CheckEmailView.as_view(), name='check-email'),
    path('checknickname/', CheckNicknameView.as_view(), name='check-nickname'),       
]
