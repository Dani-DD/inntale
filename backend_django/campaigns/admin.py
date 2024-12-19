from django.contrib import admin
from django.utils.html import format_html
from .models import Campaign, Manual


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
    list_filter = ["manual", "is_edited"]

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


admin.site.register(Manual)
