from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from campaigns.models import Campaign
import pytest


@pytest.mark.django_db
def test_if_campaigns_exists_return_200():
    # ARRANGE
    baker.make(Campaign, _quantity=20)

    # ACT
    client = APIClient()
    response = client.get("http://127.0.0.1:8000/root/campaigns/")

    # ASSERT
    assert response.status_code == status.HTTP_200_OK
