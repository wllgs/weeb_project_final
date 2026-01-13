import json

from django.db.models import Count, Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from weeb_app.models import ContactMessage

from .ml import predict_satisfaction
from .serializers import ContactMessageSerializer


class ContactMessageCreateView(CreateAPIView):
    """
    Endpoint POST /api/contact/
    Enregistre un message et calcule la satisfaction (0 = negatif, 1 = positif).
    """

    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        message = serializer.validated_data.get("message", "")
        satisfaction, score = predict_satisfaction(message)
        serializer.save(satisfaction=satisfaction, satisfaction_score=score)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def satisfaction_analytics(request):
    """
    Endpoint GET /api/analytics/satisfaction/
    Retourne les statistiques globales (negatifs / positifs + ratio moyen).
    """

    agg = ContactMessage.objects.aggregate(
        total=Count("id"),
        negatives=Count("id", filter=Q(satisfaction=0)),
        positives=Count("id", filter=Q(satisfaction__gte=1)),
    )
    total = agg["total"] or 0
    positives = agg["positives"] or 0

    return Response(
        {
            "total": total,
            "negatives": agg["negatives"] or 0,
            "positives": positives,
            "satisfaction_ratio": (positives / total) if total else None,
        }
    )


@csrf_exempt
@require_POST
def PredictSatisfaction(request):
    """
    Endpoint utilitaire: POST {"message": "..."} -> {"satisfaction": 0|1, "score": float}
    """

    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON invalide."}, status=400)

    comment = (payload.get("message") or payload.get("commentaire") or "").strip()
    if not comment:
        return JsonResponse(
            {"error": 'Le champ "message" (ou "commentaire") est requis.'}, status=400
        )

    try:
        satisfaction, score = predict_satisfaction(comment)
    except Exception as exc:
        return JsonResponse(
            {"error": f"Impossible de generer la prediction: {exc}"}, status=500
        )

    return JsonResponse({"satisfaction": satisfaction, "score": score})
