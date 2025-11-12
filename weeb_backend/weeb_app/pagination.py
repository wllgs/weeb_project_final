from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    """
    Pagination personnalisée avec des informations supplémentaires
    """
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50

    def get_paginated_response(self, data):
        """
        Retourne une réponse paginée personnalisée.
        """
        return Response({
            'total_count': self.page.paginator.count,  # Nombre total d'articles
            'total_pages': self.page.paginator.num_pages,  # Nombre total de pages
            'current_page': self.page.number,  # Numéro de la page actuelle
            'next': self.get_next_link(),  # Lien vers la page suivante
            'previous': self.get_previous_link(),  # Lien vers la page précédente
            'results': data,  # Données pour la page actuelle
        })
