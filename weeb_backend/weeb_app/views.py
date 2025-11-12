from rest_framework import viewsets, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q

from .models import Article, ContactMessage
from .serializers import ArticleSerializer, ContactMessageSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Autorise la lecture �� tous, limite l'��criture aux administrateurs."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class ArticleViewSet(viewsets.ModelViewSet):
    """
    Endpoints CRUD pour /api/articles/
    - GET /api/articles/            : liste (paginée), recherche ?search=, tri ?ordering=
    - POST /api/articles/           : création
    - GET /api/articles/{id}/       : détail
    - PUT/PATCH /api/articles/{id}/ : mise à jour
    - DELETE /api/articles/{id}/    : suppression
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "title"]

class ContactMessageCreateView(CreateAPIView):
    """
    Endpoint POST /api/contact/
    Enregistre un message et calcule la satisfaction (0/1) + score.
    """
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def satisfaction_analytics(request):
    """
    Endpoint GET /api/analytics/satisfaction/
    Donne des stats globales: total, satisfaits, non-satisfaits, ratio.
    """
    agg = ContactMessage.objects.aggregate(
        total=Count("id"),
        satisfied=Count("id", filter=Q(satisfaction=True)),
        unsatisfied=Count("id", filter=Q(satisfaction=False)),
    )
    total = agg["total"] or 0
    ratio = (agg["satisfied"] / total) if total else None
    return Response({
        "total": total,
        "satisfied": agg["satisfied"] or 0,
        "unsatisfied": agg["unsatisfied"] or 0,
        "satisfaction_ratio": ratio,  # ex: 0.72
    })
