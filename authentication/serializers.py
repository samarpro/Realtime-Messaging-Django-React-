from rest_framework import serializers
from .models import CustomUserModel

from rest_framework.authtoken.models import Token

# Handles SignUps
class UserAuthSerializer(serializers.ModelSerializer):
    queryset = CustomUserModel.objects.all()
    def create(self,req,**all_fields):
        # all_fields is a python dictionary which contains data that comes from form in frontend
        # it has already been deserialized
        print("Create method in UserAuthSerializer")
        print(all_fields)
        # getting items
        password = all_fields.get('password')
        print(password)        
        user = self.queryset.model(**all_fields)
        user.set_password(password)
        user.save()
        token = Token.objects.create(user=user)
        print(token)
        return token.key
    class Meta():
        model = CustomUserModel
        fields =['email','username','password','image_url']

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200,style={
        'input_type':'password'
})
    

