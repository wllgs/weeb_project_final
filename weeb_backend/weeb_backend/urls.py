"""
URL configuration for weeb_backend project.
"""
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health_check(_request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("weeb_app.urls")),
    path("api/", include("weeb_contact.urls")),
    path("api/auth/", include("users.urls")),
    path("health/", health_check),
]
