# django-filters' imports
from django_filters.rest_framework import DjangoFilterBackend

# rest_framework's imports
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

# Django's imports
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404

# App's imports
from .models import Campaign, Manual, Cast, Player, Watchlist, Setting
from .serializers import (
    CampaignSerializer,
    ManualSerializer,
    SettingSerializer,
    PlayerSerializer,
    WatchlistStaffSerializer,
    WatchlistUserSerializer,
)


class SlugViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs["pk"]
        if lookup.isdigit():
            return get_object_or_404(queryset, id=lookup)
        else:
            return get_object_or_404(queryset, slug=lookup)


# VIEWSETS
class CampaignViewSet(SlugViewSet):

    def get_queryset(self):
        return Campaign.objects.select_related("manual", "setting").prefetch_related(
            Prefetch("campaign_cast", queryset=Cast.objects.select_related("player"))
        )

    serializer_class = CampaignSerializer

    # Filtering, searching and ordering
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["manual", "setting", "campaign_cast__player"]
    search_fields = [
        "name",  # campaign's name
        "manual__name",
        "setting__name",
        "campaign_cast__player__nickname",
        "campaign_cast__player__first_name",
        "campaign_cast__player__last_name",
    ]
    ordering_fields = ["name", "release_date", "season"]


class ManualViewSet(SlugViewSet):
    def get_queryset(self):
        return Manual.objects.total_use(related_name="used_in").order_by("name")

    serializer_class = ManualSerializer


class SettingViewSet(SlugViewSet):
    def get_queryset(self):
        return Setting.objects.total_use(related_name="campaigns").order_by("name")

    serializer_class = SettingSerializer


class PlayerViewSet(SlugViewSet):
    def get_queryset(self):
        return Player.objects.appearances().order_by("first_name", "last_name")

    serializer_class = PlayerSerializer


class WatchlistViewSet(
    ListModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet
):

    # LIST
    def get_queryset(self):
        queryset = Watchlist.objects.select_related("campaign")

        # staff members can see all the watchlists
        if self.request.user.is_staff:
            return queryset

        # logged users can see only their watchlists
        return queryset.filter(user=self.request.user.id)

    # CREATE
    # Pass to the serializer the information about the user id
    def get_serializer_context(self):
        return {"user_id": self.request.user.id, "request": self.request}

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == "POST":
            if self.request.user.is_staff:
                return WatchlistStaffSerializer
        return WatchlistUserSerializer

    permission_classes = [IsAuthenticated]


# TESTING VIEWS
@api_view(["GET"])
def test_view(request: Request):
    if request.method == "GET":
        ordering_param = request.query_params.get("ordering", "")

        # No ordering param
        if not ordering_param:
            queryset = Campaign.objects.all()

        # Ascending order
        if ordering_param == "release_date":
            queryset = Campaign.objects.order_by("release_date")

        # Descending order
        if ordering_param == "-release_date":
            queryset = Campaign.objects.order_by("-release_date")

        serializer = CampaignSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
