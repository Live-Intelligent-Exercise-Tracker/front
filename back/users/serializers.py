from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", , "email", "nickname", "password", "age", "height", "weight"
        ]

    def validate_password(self, value):
        # 비밀번호 최소 길이 체크
        if len(value) < 8:
            raise serializers.ValidationError("비밀번호는 8자 이상이어야 합니다.")
        return make_password(value)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("이미 존재하는 이메일입니다.")
        return value

class UserBiodataSerializer(serializers.ModelSerializer):
    gender = serializers.ChoiceField(choices=UserBiodata.GenderChoices.choices)

    class Meta:
        model = UserBiodata
        fields = ['gender', 'age', 'height', 'weight', 'resting_hr']

