from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserModelManager

class CustomUserModel(AbstractUser):
    # username->email
    email = models.EmailField(unique=True,null=False)
    username = models.CharField(max_length=100,auto_created=True)
    friends = models.ManyToManyField(to='self',blank=True,symmetrical=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=[]

    objects = CustomUserModelManager()

    def __str__(self):
        return f"{self.email}-{self.pk}"
    
