from datetime import timezone
from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

CustomUserModel = get_user_model()
class Messages(models.Model):
    sender = models.ForeignKey(CustomUserModel,on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(CustomUserModel,on_delete=models.CASCADE, related_name='receiver',null=True, default=None)
    sent_time = models.DateTimeField(get_user_model,auto_now_add=True)
    group_name = models.CharField(max_length=250,default = "Group_name",null=True)
    # image = 
    text = models.TextField()

    def __str__(self):
        return f'From {self.sender.email} to {self.sender.email}'
    

class UserCreatedGroups(models.Model):
    owner = models.ForeignKey(CustomUserModel,on_delete=models.CASCADE,related_name="group_owner")
    group_name = models.CharField(max_length=100,null=False,unique=True)
    members = models.ManyToManyField(CustomUserModel,related_name="members")

    def __str__(self):
        return self.group_name

