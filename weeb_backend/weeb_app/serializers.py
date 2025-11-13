from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    """Sérialiseur CRUD pour les articles."""

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "content",
            "is_published",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Le titre doit faire au moins 3 caractères."
            )
        return value
