from rest_framework import generics
from rest_framework.views import Response
from .models import CustomUserModel
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserAuthSerializer, UserLoginSerializer
# Create your views here.

class GenericSignUpView(generics.GenericAPIView):
    '''Sign Up for User'''
    queryset = CustomUserModel.objects.all()
    serializer_class = UserAuthSerializer
    permission_classes = []

    def post(self,req):
        print("Got a post Request.")
        print(req.data)
        serializer = UserAuthSerializer(data=req.data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        token = serializer.create(req=req,**serializer.validated_data)         # type: ignore
        return Response({'token':token})
    
class GenericLoginView(generics.GenericAPIView):

    queryset = CustomUserModel.objects.all()
    serializer_class = UserLoginSerializer

    def post(self, request):
        token = None 
        request_data = {
        "method": request.method,
        "headers": dict(request.headers),
        "body": request.data,
        "query_params": request.query_params,
        "path": request.path
    }
    
        # Print the request as a dictionary
        print("Request as Dictionary:", request_data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request,email=email,password=password)
            if user:
                token = Token.objects.get(user=user).key
            
        return Response({
            'token' : token
        }) 