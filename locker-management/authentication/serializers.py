from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "password2",
            "first_name",
            "last_name",
            "role",
        ]
        extra_kwargs = {"role": {"default": "user"}}

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords don't match")

        # Additional password validation
        password = data["password"]
        if len(password) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long"
            )
        if not any(c.isdigit() for c in password):
            raise serializers.ValidationError(
                "Password must contain at least one digit"
            )
        if not any(c.isupper() for c in password):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter"
            )

        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "created_at",
        ]
