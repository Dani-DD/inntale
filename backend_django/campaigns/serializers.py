from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import Campaign, Manual, Cast, Player, Watchlist


# test
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

    def save(self):
        # Obtain the id of the user from the context
        user_id = self.context["user_id"]
        user = User.objects.get(id=user_id)

        campaign = self.validated_data["campaign"]

        Watchlist.objects.create(user=user, campaign=campaign)


# serializers
class CampaignCastSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cast
        fields = ["id", "player", "character", "profile_pic"]

    player = serializers.StringRelatedField()
    profile_pic = serializers.ImageField(source="player.profile_pic")


class CampaignSerializer(serializers.ModelSerializer):

    manual = serializers.StringRelatedField()
    campaign_cast = CampaignCastSerializer(many=True)

    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "season",
            "slug",
            "is_edited",
            "manual",
            "youtube_link",
            "release_date",
            "thumbnail",
            "campaign_cast",
        ]
        read_only_fields = ["slug"]


class ManualSerializer(serializers.ModelSerializer):
    total_use = serializers.SerializerMethodField()

    class Meta:
        model = Manual
        fields = ["id", "name", "slug", "total_use"]
        read_only_fields = ["slug"]

    def get_total_use(self, manual: Manual):
        return manual.total_use


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
