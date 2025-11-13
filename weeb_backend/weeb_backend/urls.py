"""
URL configuration for weeb_backend project.
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("weeb_app.urls")),
    path("api/", include("weeb_contact.urls")),
]
