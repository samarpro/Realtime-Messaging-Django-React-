from django.contrib.auth import backends, get_user_model, hashers

class CustomAuthBackend(backends.BaseBackend):
    def authenticate(self,request,email=None,password=None,**kwargs):
        print("Authenticating")
        if email is None and 'username' in kwargs:
            email = kwargs['username']
        print(email,password,kwargs)
        if email is None or password is None:
            print("is None")
            return None
        CustomUserModel = get_user_model()
        try:
            user = CustomUserModel.objects.get(email=email)
            # user.set_password("0123456789!")
            if user.check_password(password):
                print("Password Matched")
                return user
            print("Password didn't match")
            return None
        except CustomUserModel.DoesNotExist:
            print("Error User doesn't exist")
            return None
    
    # def get_user(self,req,**kwargs):



