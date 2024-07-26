from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserModelManager
from django.core.validators import URLValidator
class CustomUserModel(AbstractUser):
    # username->email
    email = models.EmailField(unique=True,null=False)
    password = models.CharField(max_length=250, blank=True, null=True)
    username = models.CharField(max_length=100,auto_created=True)
    friends = models.ManyToManyField(to='self',blank=True,symmetrical=False)
    image_url = models.URLField(
        max_length=50000,
        unique=False,
        validators=[URLValidator(schemes=['http','https'])],
        null=True,
        blank=True
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=[]

    objects = CustomUserModelManager()

    def __str__(self):
        return f"{self.email}-{self.pk}"
    
