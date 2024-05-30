from rest_framework import serializers
from .models import CustomUserModel

from rest_framework.authtoken.models import Token

class UserAuthSerializer(serializers.ModelSerializer):
    queryset = CustomUserModel.objects.all()
    def create(self,req,**all_fields):
        print("Running Create")
        # getting items
        password = all_fields.get('password')
        print(password)
        # pops out the last item -> password2
        
        user = self.queryset.model(**all_fields)
        user.set_password(password)
        user.save()
        token = Token.objects.create(user=user)
        print(token)
        return token.key
    class Meta():
        model = CustomUserModel
        fields =['email','username','password']

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200,style={
        'input_type':'password'
})
    

