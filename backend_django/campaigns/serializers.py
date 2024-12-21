from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import Campaign, Manual


class CampaignSerializer(serializers.ModelSerializer):

    manual = serializers.StringRelatedField()

    class Meta:
        model = Campaign
        fields = [
            "name",
            "season",
            "slug",
            "is_edited",
            "manual",
            "youtube_link",
            "release_date",
        ]
        read_only_fields = ["slug"]


class ManualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manual
        fields = ["name", "slug"]
        read_only_fields = ["slug"]


# AUTHENTICATION
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["email"] = user.email
        token["username"] = user.username

        return token


class RegisteringUserSerializer(UserCreateSerializer):
    repeat_password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, required=True
    )

    # Without this, the following fields will be required=False by default
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)

    class Meta(UserCreateSerializer.Meta):
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
            "repeat_password",
        ]

    def validate(self, attrs):

        if attrs["password"] != attrs["repeat_password"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        new_user = User()
        new_user.first_name = validated_data["first_name"]
        new_user.last_name = validated_data["last_name"]
        new_user.email = validated_data["email"]
        new_user.username = validated_data["username"]
        new_user.set_password(validated_data["password"])
        new_user.save()
        return new_user
