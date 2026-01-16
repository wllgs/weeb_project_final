from django.urls import path

from .views import (
    ContactMessageCreateView,
    ContactMessageListView,
    PredictSatisfaction,
    satisfaction_analytics,
)

urlpatterns = [
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
    path("contact/messages/", ContactMessageListView.as_view(), name="contact-messages"),
    path(
        "analytics/satisfaction/",
        satisfaction_analytics,
        name="satisfaction-analytics",
    ),
    path("predict/", PredictSatisfaction, name="predict-satisfaction"),
]
