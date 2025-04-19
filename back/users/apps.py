from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    

    def ready(self):
        from users.models.auth_models import User        
        from django.contrib.auth.hashers import make_password
        

       
            
