from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("campaigns", views.CampaignViewSet, basename="campaigns")
router.register("manuals", views.ManualViewSet, basename="manuals")
router.register("settings", views.SettingViewSet, basename="settings")
router.register("players", views.PlayerViewSet, basename="players")
router.register("watchlist", views.WatchlistViewSet, basename="watchlist")

urlpatterns = [
    path("test/", views.test_view, name="test"),
] + router.urls
