from django.db import models
from django.utils.text import slugify


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
    # "campaign_cast" field as reverse ForeignKey from Cast model

    class Meta:
        ordering = ["name", "season"]

    def save(self):
        if not self.slug:
            self.slug = slugify(f"{self.name} s{self.season}")
        return super().save()

    def __str__(self):
        return f"{self.name} s{self.season}"


class Manual(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    # "used _in" as reverse foreign key from Campaign model

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["name"]


class Player(models.Model):
    nickname = models.CharField(max_length=64, blank=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    # campaigns_played field as reverse ForeignKey from Cast model

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ["first_name", "last_name"]


class Cast(models.Model):
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="campaign_cast"
    )
    player = models.ForeignKey(
        "Player", on_delete=models.PROTECT, related_name="campaigns_played"
    )
    character = models.CharField(max_length=30)

    class Meta:
        verbose_name = "Cast"
        verbose_name_plural = "Cast"
        ordering = ["campaign", "player"]

    def __str__(self):
        return f"In {self.campaign.name} s{self.campaign.season}: {self.player.first_name} {self.player.last_name} as {self.character}"
