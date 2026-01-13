from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    """Serialiseur CRUD pour les articles."""

    author = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'content',
            'is_published',
            'author',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                'Le titre doit faire au moins 3 caracteres.'
            )
        return value

    def get_author(self, obj):
        if not obj.author:
            return None
        return {
            'id': obj.author_id,
            'email': obj.author.email,
            'first_name': obj.author.first_name,
            'last_name': obj.author.last_name,
        }
