from django.contrib import admin
from django.http import HttpRequest
from django.db.models import Count
from django.utils.html import format_html
from .models import Campaign, Manual, Player


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
    list_filter = ["manual", "is_edited", FilterCampaignsByYear]

    @admin.display(ordering="name")
    def titlecase_name(self, campaign: Campaign):
        return campaign.name.title()

    titlecase_name.short_description = "name"

    def titlecase_manual(self, campaign: Campaign):
        return campaign.manual.name.title()

    titlecase_manual.short_description = "manual"

    def show_youtube_link(self, campaign: Campaign):
        url = campaign.youtube_link
        return format_html('<a href="{}" target="_blank">{}</a>', url, url)


@admin.register(Manual)
class ManualAdmin(admin.ModelAdmin):
    list_display = ["titlecase_name", "used_n_times"]

    @admin.display(ordering="name")
    def titlecase_name(self, manual: Manual):
        return manual.name.title()

    titlecase_name.short_description = "name"

    # Implementing the used_n_times annotation
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(used_n_times=Count("used_in"))

    # Displaying the used_n_times annotation in the admin
    @admin.display(ordering="used_n_times")
    def used_n_times(self, manual: Manual):
        BASE_URL = "http://127.0.0.1:8000/"
        manual_url = (
            f"{BASE_URL}admin/campaigns/campaign/?manual__id__exact={manual.id}"
        )
        return format_html("<a href='{}'>{}</a>", manual_url, manual.used_n_times)


admin.site.register(Player)
