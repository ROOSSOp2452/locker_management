from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Locker
from .serializers import LockerSerializer
from authentication.permissions import IsAdminUser


class LockerViewSet(viewsets.ModelViewSet):
    queryset = Locker.objects.all()
    serializer_class = LockerSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]
