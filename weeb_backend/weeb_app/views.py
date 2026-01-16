from django.db.models import Q
from rest_framework import permissions, viewsets

from .models import Article
from .serializers import ArticleSerializer


class IsAdminOrOwnerOrReadOnly(permissions.BasePermission):
    """Lecture publique, ecriture reservee aux membres actifs, edition au proprietaire ou admin."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method == 'POST':
            return bool(
                request.user
                and request.user.is_authenticated
                and (request.user.is_active or request.user.is_staff)
            )
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user and request.user.is_staff:
            return True
        return bool(request.user and request.user.is_active and obj.author_id == request.user.id)


class ArticleViewSet(viewsets.ModelViewSet):
    """CRUD complet pour les articles."""

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminOrOwnerOrReadOnly]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return Article.objects.all()
        if user.is_authenticated:
            return Article.objects.filter(Q(is_published=True) | Q(author=user))
        return Article.objects.filter(is_published=True)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
