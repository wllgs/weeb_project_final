from rest_framework import permissions, viewsets

from .models import Article
from .serializers import ArticleSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Autorise la lecture à tous, limite l’écriture aux administrateurs."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class ArticleViewSet(viewsets.ModelViewSet):
    """
    CRUD complet pour les articles.
    """

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "title"]
