from django.db import models
from users.models.auth_models import User


class OAuthProvider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="oauth_provider")
    provider_name = models.CharField(max_length=20, choices=[("kakao", "Kakao")], default="kakao")
    provider_id = models.CharField(max_length=255, unique=True)
    access_token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "oauth_provider"

    def __str__(self):
        return f"{self.user.nickname} - {self.provider_name}"
