from django.contrib.auth.models import UserManager



class CustomUserModelManager(UserManager):
    """Manager for validating users with email rather than passwords"""

    # base class for user creation
    # _<var_name> is a private var
    def _create_users(self,email=None,password=None,**extra_fields):
        if email is None or password is None:
            raise AttributeError("Email and Password field is must.")
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        # encrypts the password
        user.set_password(password)
        user.save(using=self._db)
        return user
    # utilizes base class for user creation
    def create_user(self,email,password,**extra_fields):
        #extra_field contains is_staff, is_active and etc...
        extra_fields.setdefault("is_active",True)
        return self._create_users(email,password,**extra_fields)
    
    def create_superuser(self,email,password,**extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)
        extra_fields.setdefault("is_active",True)
        return self._create_users(email,password,**extra_fields)
