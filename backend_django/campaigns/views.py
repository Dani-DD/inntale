from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from .models import Campaign, Manual, Cast, Player
from .serializers import CampaignSerializer, ManualSerializer, PlayerSerializer


# Create your views here.
@api_view(["GET"])
def campaign_list(request: Request):
    if request.method == "GET":
        queryset = Campaign.objects.select_related("manual").prefetch_related(
            Prefetch("campaign_cast", queryset=Cast.objects.select_related("player"))
        )
        serializer = CampaignSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def campaign_detail(request: Request, identifier: str):
    try:
        pk = int(identifier)
        campaign = get_object_or_404(Campaign, pk=pk)
    except ValueError:
        campaign = get_object_or_404(Campaign, slug=identifier)

    if request.method == "GET":
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def manual_list(request: Request):
    if request.method == "GET":
        queryset = Manual.objects.all()
        serializer = ManualSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def manual_detail(request: Request, identifier):
    try:
        pk = int(identifier)
        manual = get_object_or_404(Manual, pk=pk)
    except ValueError:
        manual = get_object_or_404(Manual, slug=identifier)

    if request.method == "GET":
        serializer = ManualSerializer(manual)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def player_list(request: Request):
    if request.method == "GET":
        queryset = Player.objects.all()
        serializer = PlayerSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def player_detail(request: Request, identifier: str):
    try:
        pk = int(identifier)
        player = get_object_or_404(Player, pk=pk)
    except ValueError:
        player = get_object_or_404(Player, slug=identifier)

    if request.method == "GET":
        serializer = PlayerSerializer(player)
        return Response(serializer.data, status=status.HTTP_200_OK)


# TESTING VIEWS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def test_view(request: Request):
    return Response("This is a protected endpoint.")
