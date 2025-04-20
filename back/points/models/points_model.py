from django.db import models
from django.conf import settings

class Points(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='points'
    )
    amount = models.IntegerField()  
    reason = models.CharField(max_length=100)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.nickname} - {self.amount}P ({self.reason})"