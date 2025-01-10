from django.test import TestCase
from locust import HttpUser, task, between
from random import randint


# Create your tests here.
class PerformanceTest(HttpUser):
    wait_time = between(1, 5)

    @task(2)
    def view_all_campaigns(self):
        print("Browsing all campaigns...")
        self.client.get("campaigns/", name="campaigns/")

    @task(1)
    def view_filtered_campaigns(self):
        print("Browsing filtered campaigns...")
        manual_id = randint(1, 5)
        player_id = randint(1, 10)
        self.client.get(
            f"campaigns/?manual={manual_id}&campaign_cast__player={player_id}",
            name="/campaigns/?_filter",
        )
