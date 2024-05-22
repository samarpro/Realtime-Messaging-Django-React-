from rest_framework import serializers
from .models import CustomUserModel

from rest_framework.authtoken.models import Token

class UserAuthSerializer(serializers.ModelSerializer):
    queryset = CustomUserModel.objects.all()
    password2 = serializers.CharField(max_length=100,style={
        'input-type':'password'
    },label="Confirm Password")

    def validate_password2(self,password2):
        '''
        Runs automatically when serializer.is_valid() is called.
        Return value will be the new value of the field_name ->
        validate_field_name
        '''
        print("Validating Password2!")
        if not password2 == self.initial_data['password']:
            raise serializers.ValidationError("Password field didn't match.")
        return password2

    def create(self,req,**all_fields):
        print("Running Create")
        # getting items
        password = all_fields.pop('password2')
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
        fields =['email','username','password','password2']

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200,style={
        'input_type':'password'
})
    

