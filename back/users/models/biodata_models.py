from django.db import models
from django.conf import settings

class UserBiodata(models.Model):
    class GenderChoices(models.TextChoices):
        MALE = 'male', '남성'
        FEMALE = 'female', '여성'
        OTHER = 'other', '기타'

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='biodata')
    gender = models.CharField(
        max_length=10,
        choices=GenderChoices.choices,
        default=GenderChoices.OTHER
    )
    age = models.PositiveIntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    resting_hr = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.nickname}의 바이오데이터"