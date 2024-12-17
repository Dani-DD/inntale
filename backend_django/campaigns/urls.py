from . import views
from django.urls import path, re_path

urlpatterns = [
    path("test/", views.test_view, name="test"),
    path("manuals/", views.manual_list, name="manuals"),
    re_path(
        r"^manuals/(?P<identifier>[\w-]+)/$", views.manual_detail, name="manual-detail"
    ),
]
