from django.contrib import admin
from .models import Article, ContactMessage

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "created_at")
    search_fields = ("title", "content")
    list_filter = ("is_published",)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "first_name", "last_name", "email", "phone", "newsletter_opt_in", "satisfaction", "created_at")
    search_fields = ("name", "first_name", "last_name", "email", "message", "phone")
    list_filter = ("newsletter_opt_in", "satisfaction",)


