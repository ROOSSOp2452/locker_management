from rest_framework import serializers
from .models import Reservation
from lockers.serializers import LockerSerializer
from authentication.serializers import UserSerializer


class ReservationSerializer(serializers.ModelSerializer):
    locker_details = LockerSerializer(source="locker", read_only=True)
    user_details = UserSerializer(source="user", read_only=True)

    class Meta:
        model = Reservation
        fields = "__all__"
        read_only_fields = ["user", "reserved_at", "created_at", "updated_at"]

    def validate(self, data):
        if data.get("locker") and data["locker"].status != "available":
            raise serializers.ValidationError("Locker is not available")
        return data
