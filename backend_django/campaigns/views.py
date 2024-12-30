from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["manual", "campaign_cast__player"]

    """
    
    To enable filtering, go to your ViewSet and override the filter_backends and filterset_fields:
the first one is the attribute that indicates the list of classes that you want to use to perform the filtering. In this case, we'll use the DjangoFilterBackend class.
the second one is the attribute that indicates the list of fields we want to filter.

    """


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
@permission_classes([IsAuthenticated])
def test_view(request: Request):
    return Response("This is a protected endpoint.")
