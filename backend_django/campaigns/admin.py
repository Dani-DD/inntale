from django.contrib import admin
from django.http import HttpRequest
from django.db.models import Count
from django.utils.html import format_html
from .models import Campaign, Manual, Player, Cast

BASE_URL = "http://127.0.0.1:8000/"


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
class CampaignAdmin(admin.ModelAdmin):
    list_display = [
        "titlecase_name",
        "season",
        "is_edited",
        "titlecase_manual",
        "show_youtube_link",
        "release_date",
        "slug",
    ]
    list_select_related = ["manual"]
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

    inlines = [CastInline]

    @admin.display(ordering="name", description="name")
    def titlecase_name(self, campaign: Campaign):
        return campaign.name.title()

    @admin.display(description="manual")
    def titlecase_manual(self, campaign: Campaign):
        return campaign.manual.name.title()

    def show_youtube_link(self, campaign: Campaign):
        url = campaign.youtube_link
        return format_html('<a href="{}" target="_blank">{}</a>', url, url)


@admin.register(Manual)
class ManualAdmin(admin.ModelAdmin):
    list_display = ["titlecase_name", "total_use"]

    def get_queryset(self, request):
        return Manual.objects.total_use().all()

    @admin.display(ordering="name", description="name")
    def titlecase_name(self, manual: Manual):
        return manual.name.title()

    @admin.display(ordering="total_use")
    def total_use(self, manual: Manual):
        campaign_admin_url = "admin/campaigns/campaign/"
        url_query_parameter = "?manual__id__exact="
        full_url = f"{BASE_URL}{campaign_admin_url}{url_query_parameter}{manual.pk}"
        return format_html("<a href={}>{}</a>", full_url, manual.total_use)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ["full_name", "appearances"]
    ordering = ["first_name", "last_name"]
    list_filter = ["campaigns_played__campaign"]

    @admin.display(description="player")
    def full_name(self, player: Player):
        return f"{player.first_name.capitalize()} {player.last_name.capitalize()}"

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .annotate(appearances=Count("campaigns_played"))
        )

    @admin.display(ordering="appearances")
    def appearances(self, player: Player):
        return player.appearances


admin.site.register(Cast)
