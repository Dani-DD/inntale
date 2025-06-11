# Python's imports
from abc import abstractmethod
from typing import Union

# Django's imports
from django import forms
from django.contrib import admin, messages
from django.db import models
from django.db.models import Count
from django.forms import Textarea
from django.http import HttpRequest
from django.utils.html import format_html
from django.utils.text import slugify

# App's imports
from .models import Campaign, Manual, Player, Cast, Watchlist, Setting

BASE_URL = "http://127.0.0.1:8000/"


class SlugAdminModel(admin.ModelAdmin):
    def get_form(self, request, obj=..., change=..., **kwargs):
        form = super().get_form(request, obj, change, **kwargs)

        if obj:
            form.base_fields["slug"].help_text = (
                "Typically, you do not need to edit this field."
            )

        else:
            form.base_fields["slug"].widget = forms.HiddenInput()

        return form


class CastInline(admin.TabularInline):
    model = Cast


class FilterCampaignsByYear(admin.SimpleListFilter):
    title = "Year"

    def lookups(self, request: HttpRequest, model_admin: admin.ModelAdmin):
        # Get all the years from the release_date field
        years = model_admin.model.objects.dates("release_date", "year", "ASC")
        # Convert the years to a list of tuples
        # (the first element is the query string value, the second is the human-readable value)
        years = [(year.year, str(year.year)) for year in years]

        return years

    parameter_name = "release_year"

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset
        return queryset.filter(release_date__year__exact=self.value())


# Register your models here.
@admin.register(Campaign)
class CampaignAdmin(SlugAdminModel):
    list_display = [
        "titlecase_name",
        "season",
        "is_edited",
        "titlecase_manual",
        "setting",
        "show_youtube_link",
        "release_date",
        "slug",
        "campaign_thumbnail",
    ]
    list_select_related = ["manual", "setting"]
    list_filter = [
        "manual",
        "is_edited",
        FilterCampaignsByYear,
    ]
    search_fields = [
        "name",
        "campaign_cast__player__first_name",
        "campaign_cast__player__last_name",
        "campaign_cast__player__nickname",
    ]
    search_help_text = "Filter campaigns by name or player's name"
    actions = ["copy_campaign"]
    inlines = [CastInline]
    formfield_overrides = {
        models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 40})},
    }
    fields = [
        "name",
        "season",
        "manual",
        "setting",
        "is_edited",
        "youtube_link",
        "release_date",
        "thumbnail",
        "slug",
    ]

    @admin.display(ordering="name", description="name")
    def titlecase_name(self, campaign: Campaign):
        return campaign.name.title()

    @admin.display(description="manual")
    def titlecase_manual(self, campaign: Campaign):
        return campaign.manual.name.title()

    def show_youtube_link(self, campaign: Campaign):
        url = campaign.youtube_link
        return format_html('<a href="{}" target="_blank">{}</a>', url, url)

    @admin.action(description="Copy selected campaigns as new seasons")
    def copy_campaign(self, request, queryset):
        successful_updates = 0
        failure_updates = 0

        for campaign in queryset:
            try:
                original_cast = list(campaign.campaign_cast.all())
                campaign.season += 1
                campaign.slug = slugify(f"{campaign.name} s{campaign.season}")
                campaign.pk = None
                campaign.save()

                for cast_member in original_cast:
                    cast_member.pk = None
                    cast_member.campaign = campaign
                    cast_member.save()

                successful_updates += 1

            except Exception:
                failure_updates += 1

        if successful_updates > 0:
            self.message_user(
                request,
                f"{successful_updates} campaigns correctly copied",
                messages.SUCCESS,
            )

        if failure_updates > 0:
            self.message_user(
                request,
                f"Error in the copy of {failure_updates} campaigns",
                messages.ERROR,
            )

    @admin.display(description="thumbnail")
    def campaign_thumbnail(self, campaign: Campaign):
        if campaign.thumbnail:
            return format_html(
                f'<img src="{campaign.thumbnail.url}" class="campaign-thumbnail"/>'
            )
        return ""

    class Media:
        css = {"all": ["campaigns_style.css"]}


class ManualAndSettingAdmin(SlugAdminModel):
    @abstractmethod
    def get_related_name(self):
        pass

    list_display = ["titlecase_name", "total_use"]
    ordering = ["name"]

    def get_queryset(self, request):
        return self.model.objects.total_use(related_name=self.get_related_name()).all()

    @admin.display(ordering="name", description="name")
    def titlecase_name(self, obj: Union[Manual, Setting]):
        return obj.name.title()

    @admin.display(ordering="total_use")
    def total_use(self, obj: Union[Manual, Setting]):
        campaign_admin_url = "admin/campaigns/campaign/"
        url_query_parameter = (
            "?manual__id__exact=" if isinstance(obj, Manual) else "?setting__id__exact="
        )
        full_url = f"{BASE_URL}{campaign_admin_url}{url_query_parameter}{obj.pk}"
        return format_html("<a href={}>{}</a>", full_url, obj.total_use)


@admin.register(Manual)
class ManualAdmin(ManualAndSettingAdmin):
    def get_related_name(self):
        return "used_in"


@admin.register(Setting)
class SettingAdmin(ManualAndSettingAdmin):
    def get_related_name(self):
        return "campaigns"


@admin.register(Player)
class PlayerAdmin(SlugAdminModel):
    list_display = ["full_name", "appearances", "profile_image"]
    ordering = ["first_name", "last_name"]
    list_filter = ["campaigns_played__campaign"]

    @admin.display(description="player")
    def full_name(self, player: Player):
        return f"{player.first_name.capitalize()} {player.last_name.capitalize()}"

    def get_queryset(self, request):
        return Player.objects.appearances().all()

    @admin.display(ordering="appearances")
    def appearances(self, player: Player):
        return player.appearances

    def profile_image(self, player: Player):
        # First we have to check if an image exists
        if player.profile_pic:
            return format_html(
                f'<img src="{player.profile_pic.url}" class="player-thumbnail" />'
            )  # url is a property of ImageField
        return ""

    class Media:
        css = {"all": ["campaigns_style.css"]}


@admin.register(Watchlist)
class WatchlistAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "campaign"]


admin.site.register(Cast)
