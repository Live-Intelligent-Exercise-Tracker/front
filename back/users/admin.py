from django.contrib import admin
from .models.auth_models import User


admin.site.register(User)