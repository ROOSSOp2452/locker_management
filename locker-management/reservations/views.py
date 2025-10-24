from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Reservation
from .serializers import ReservationSerializer
from authentication.permissions import IsAdminUser, IsOwnerOrAdmin
from lockers.models import Locker


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Reservation.objects.all()
        return Reservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        locker = serializer.validated_data["locker"]
        locker.status = "reserved"
        locker.save()
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        locker = instance.locker
        locker.status = "available"
        locker.save()
        instance.delete()

    @action(detail=True, methods=["put"])
    def release(self, request, pk=None):
        reservation = self.get_object()
        if reservation.user != request.user and request.user.role != "admin":
            return Response(
                {"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN
            )

        reservation.is_active = False
        reservation.save()

        locker = reservation.locker
        locker.status = "available"
        locker.save()

        return Response({"message": "Reservation released successfully"})
