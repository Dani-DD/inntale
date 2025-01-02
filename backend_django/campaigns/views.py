from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter
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

    # Filtering
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["manual", "campaign_cast__player"]
    search_fields = [
        "manual__name",
        "campaign_cast__player__nickname",
        "campaign_cast__player__first_name",
        "campaign_cast__player__last_name",
    ]


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
        search_param = request.query_params.get("search", "")

        if search_param:
            queryset = Campaign.objects.filter(manual__name__icontains=search_param)
        else:
            queryset = Campaign.objects.all()

        serializer = CampaignSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
