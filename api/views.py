from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from user.models import CustomUser
from user.serializers import CustomUserSerializer



@api_view(["POST"])
@permission_classes([AllowAny])
def signup(req):
    serializer = CustomUserSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        user = CustomUser.objects.get(email=req.data["email"])
        user.set_password(req.data["password"])
        user.save()
        return Response({"detail": "Signup Successful!"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)