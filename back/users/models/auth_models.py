from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.timezone import now

class UserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None, **extra_fields):
        if not email:
            raise ValueError("email 입력은 필수입니다.")
        if not nickname:
            raise ValueError("닉네임은 필수입니다.")

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nickname, password, **extra_fields):
        user = self.create_user(email, nickname, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    nickname = models.CharField(max_length=50, unique=True)
    auth_provider = models.CharField(max_length=20, default="self")
    date_joined = models.DateTimeField(default=now)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.nickname