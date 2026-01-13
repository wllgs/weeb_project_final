from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import CustomUser
from .models import Article


class ArticleAuthTests(APITestCase):
    def _auth(self, user):
        token = RefreshToken.for_user(user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_active_member_can_create_article(self):
        user = CustomUser.objects.create_user(
            email="active@example.com",
            password="Password1234",
            is_active=True,
        )
        self._auth(user)

        response = self.client.post(
            "/api/articles/",
            {"title": "Mon article", "content": "Contenu test", "is_published": False},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["author"]["email"], user.email)
        self.assertFalse(response.data["is_published"])

    def test_inactive_member_cannot_create_article(self):
        user = CustomUser.objects.create_user(
            email="inactive@example.com",
            password="Password1234",
            is_active=False,
        )
        self._auth(user)

        response = self.client.post(
            "/api/articles/",
            {"title": "Brouillon", "content": "Essai", "is_published": False},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_drafts_visible_to_author_only(self):
        author = CustomUser.objects.create_user(
            email="author@example.com",
            password="Password1234",
            is_active=True,
        )
        other = CustomUser.objects.create_user(
            email="other@example.com",
            password="Password1234",
            is_active=True,
        )
        Article.objects.create(title="Draft", content="draft", author=author, is_published=False)
        Article.objects.create(title="Public", content="pub", author=other, is_published=True)

        self._auth(author)
        response = self.client.get("/api/articles/", format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data["results"]
        titles = {item["title"] for item in results}
        self.assertIn("Draft", titles)
        self.assertIn("Public", titles)
