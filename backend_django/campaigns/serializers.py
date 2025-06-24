# Django's imports
from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer

# rest_framework's imports
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# App's imports
from .models import Campaign, Manual, Cast, Player, Watchlist, Setting


# serializers
class CampaignCastSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cast
        fields = ["id", "player", "character", "profile_pic"]

    player = serializers.StringRelatedField()
    profile_pic = serializers.ImageField(source="player.profile_pic")


class CampaignSerializer(serializers.ModelSerializer):

    manual = serializers.StringRelatedField()
    setting = serializers.StringRelatedField()
    campaign_cast = CampaignCastSerializer(many=True)

    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "season",
            "manual",
            "setting",
            "is_edited",
            "youtube_link",
            "release_date",
            "thumbnail",
            "slug",
            "campaign_cast",
        ]
        read_only_fields = ["slug"]


class ManualAndSettingSerializer(serializers.ModelSerializer):
    total_use = serializers.SerializerMethodField()

    class Meta:
        model = None  # This will be set in subclasses
        fields = ["id", "name", "image", "slug", "total_use"]
        read_only_fields = ["slug"]

    def get_total_use(self, obj):
        return obj.total_use


class ManualSerializer(ManualAndSettingSerializer):
    class Meta(ManualAndSettingSerializer.Meta):
        model = Manual


class SettingSerializer(ManualAndSettingSerializer):
    class Meta(ManualAndSettingSerializer.Meta):
        model = Setting


class PlayerSerializer(serializers.ModelSerializer):
    appearances = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = [
            "id",
            "nickname",
            "first_name",
            "last_name",
            "appearances",
            "profile_pic",
        ]
        read_only_fields = ["slug"]

    def get_appearances(self, player: Player):
        return player.appearances


class WatchlistStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["id", "user", "campaign"]


class WatchlistUserSerializer(serializers.ModelSerializer):
    campaign = serializers.PrimaryKeyRelatedField(queryset=Campaign.objects.all())

    class Meta:
        model = Watchlist
        fields = ["id", "campaign"]

    def __init__(self, *args, **kwargs):
        super(WatchlistUserSerializer, self).__init__(*args, **kwargs)
        if self.context["request"].method == "GET":
            self.fields["campaign"] = CampaignSerializer()

    def create(self, validated_data):
        user_id = self.context["user_id"]
        user = User.objects.get(id=user_id)
        return Watchlist.objects.create(user=user, **validated_data)


# AUTHENTICATION
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)

        token["id"] = user.pk
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

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email already exists.")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["repeat_password"]:
            raise serializers.ValidationError(
                {"password": "Password fields don't match."}
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
