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
