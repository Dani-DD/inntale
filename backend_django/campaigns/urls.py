from . import views
from django.urls import path

urlpatterns = [
    path("test/", views.test_view, name="test"),
    path("manuals/", views.manual_list, name="manuals"),
    path("manuals/<int:pk>", views.manual_detail, name="manual"),
]
