from . import views
from django.urls import path

urlpatterns = [
    path("test/", views.test_view, name="test"),
    path("manuals/", views.manual_list, name="manuals"),
    path("manuals/<str:identifier>/", views.manual_detail, name="manual-detail"),
    path("campaigns/", views.campaign_list, name="campaigns"),
    path("campaigns/<str:identifier>/", views.campaign_detail, name="campaign-detail"),
    path("players/", views.player_list, name="players"),
    path("players/<str:identifier>/", views.player_detail, name="player-detail"),
]
