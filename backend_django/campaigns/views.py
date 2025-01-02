from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from .models import Campaign, Manual, Cast, Player
from .serializers import CampaignSerializer, ManualSerializer, PlayerSerializer


# VIEWSETS
class CampaignViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    def get_queryset(self):
        return Campaign.objects.select_related("manual").prefetch_related(
            Prefetch("campaign_cast", queryset=Cast.objects.select_related("player"))
        )

    def get_object(self):
        lookup = self.kwargs["pk"]
        if lookup.isdigit():
            return get_object_or_404(Campaign, id=lookup)
        else:
            return get_object_or_404(Campaign, slug=lookup)

    serializer_class = CampaignSerializer

    # Filtering, searching and ordering
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["manual", "campaign_cast__player"]
    search_fields = [
        "name",  # campaign's name
        "manual__name",
        "campaign_cast__player__nickname",
        "campaign_cast__player__first_name",
        "campaign_cast__player__last_name",
    ]
    ordering_fields = ["name", "release_date", "season"]


class ManualViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    def get_queryset(self):
        return Manual.objects.total_use().all()

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs["pk"]
        if lookup.isdigit():
            return get_object_or_404(queryset, id=lookup)
        else:
            return get_object_or_404(queryset, slug=lookup)

    serializer_class = ManualSerializer


class PlayerViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    def get_queryset(self):
        return Player.objects.appearances().all()

    def get_object(self):
        queryset = self.get_queryset()
        lookup = self.kwargs["pk"]
        if lookup.isdigit():
            return get_object_or_404(queryset, id=lookup)
        else:
            return get_object_or_404(queryset, slug=lookup)

    serializer_class = PlayerSerializer


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
