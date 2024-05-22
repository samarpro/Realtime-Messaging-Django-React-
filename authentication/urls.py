from django.urls import path
from .views import GenericSignUpView,GenericLoginView

urlpatterns = [
    path('',GenericSignUpView.as_view(),name='SignUpView'),
    path('login/',GenericLoginView.as_view(),name='LoginView')
]