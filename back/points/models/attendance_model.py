from django.db import models
from django.conf import settings

class Attendance(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='attendances'
    )
    date = models.DateField()
    checked = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "date")
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.nickname} - {self.date} ({'✓' if self.checked else '✗'})"