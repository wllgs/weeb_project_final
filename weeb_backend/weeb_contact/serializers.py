from rest_framework import serializers

from weeb_app.models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Sérialiseur utilisé pour créer / lister les messages de contact."""

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "first_name",
            "last_name",
            "name",
            "email",
            "phone",
            "message",
            "newsletter_opt_in",
            "satisfaction",
            "satisfaction_score",
            "created_at",
        ]
        read_only_fields = ["id", "name", "satisfaction", "satisfaction_score", "created_at"]

    def validate(self, attrs):
        # Force l'enregistrement d'un nom complet si non transmis
        first = attrs.get("first_name", "").strip()
        last = attrs.get("last_name", "").strip()
        full = (attrs.get("name") or "").strip()
        if not full:
            full = " ".join(part for part in [first, last] if part).strip() or "Anonyme"
        attrs["name"] = full
        return attrs
