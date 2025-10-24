from rest_framework import serializers
from .models import Locker


class LockerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locker
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]
