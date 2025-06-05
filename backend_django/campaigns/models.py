from django.contrib.auth.models import User
from django.db import models
from django.db.models.aggregates import Count
from django.utils.text import slugify
import os


# Testing
class Watchlist(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_watchlist"
    )
    campaign = models.ForeignKey(
        "Campaign", on_delete=models.CASCADE, related_name="in_watchlist"
    )


# Create your models here.
class Campaign(models.Model):
    name = models.TextField()
    season = models.PositiveSmallIntegerField()
    slug = models.SlugField(unique=True)
    is_edited = models.BooleanField()
    manual = models.ForeignKey(
        "Manual", on_delete=models.PROTECT, related_name="used_in"
    )
    youtube_link = models.TextField()
    release_date = models.DateField(null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True, upload_to="campaigns/")
    # "campaign_cast" as reverse ForeignKey from Cast model
    # "in_watchlist" as reverse ForeignKey from Watchlist model

    class Meta:
        ordering = ["name", "season"]

    def save(self, *args, **kwargs):
        # Autocreate the slug field
        if not self.slug:
            self.slug = slugify(f"{self.name} s{self.season}")

        # Avoid duplicating existing images
        if self.thumbnail:
            # Get the image chosen for this record
            image_name = os.path.basename(self.thumbnail.name)

            # Let's check if already exist a record that use that image
            existing_record = Campaign.objects.filter(
                thumbnail__endswith=image_name
            ).first()

            # If so, let's use that image
            if existing_record:
                self.thumbnail = existing_record.thumbnail

        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} s{self.season}"


class ManualManager(models.Manager):
    def total_use(self):
        return (
            self.get_queryset()
            .prefetch_related("used_in")
            .annotate(total_use=Count("used_in"))
        )


class Manual(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    # "used _in" as reverse foreign key from Campaign model
    objects = ManualManager()

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["name"]


class PlayerManager(models.Manager):
    def appearances(self):
        return Player.objects.prefetch_related("campaigns_played").annotate(
            appearances=Count("campaigns_played")
        )


class Player(models.Model):
    nickname = models.CharField(max_length=64, blank=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    profile_pic = models.ImageField(blank=True, null=True, upload_to="players/")
    slug = models.SlugField(unique=True)
    # campaigns_played as reverse ForeignKey from Cast model
    objects = PlayerManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ["first_name", "last_name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.first_name} {self.last_name}")
        return super().save(*args, **kwargs)


class Cast(models.Model):
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="campaign_cast"
    )
    player = models.ForeignKey(
        "Player", on_delete=models.PROTECT, related_name="campaigns_played"
    )
    character = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Cast"
        verbose_name_plural = "Cast"
        ordering = ["campaign", "player"]

    def __str__(self):
        return f"In {self.campaign.name} s{self.campaign.season}: {self.player.first_name} {self.player.last_name} as {self.character}"
