from django.urls import path
from .views import *


urlpatterns = [
    path('user/signup/', signup, name="signup"),
    path('user/login/', login, name="login"),
    path('user/test_token/', test_token, name="test_token"),
    
]