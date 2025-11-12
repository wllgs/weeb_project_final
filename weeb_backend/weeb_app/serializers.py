from rest_framework import serializers
from .models import Article, ContactMessage

class ArticleSerializer(serializers.ModelSerializer):
    """Sérialiseur CRUD pour les articles."""
    class Meta:
        model = Article
        fields = ["id", "title", "content", "is_published", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Le titre doit faire au moins 3 caractères.")
        return value


class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Sérialiseur de création d'un message de contact.
    La satisfaction est calculée côté serveur à partir du `message`.
    """
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

    def create(self, validated_data):
        first = validated_data.get("first_name", "").strip()
        last = validated_data.get("last_name", "").strip()
        full_name = (validated_data.get("name") or "").strip()
        if not full_name:
            full_name = " ".join(part for part in [first, last] if part).strip() or "Anonyme"
        validated_data["name"] = full_name
        return super().create(validated_data)

