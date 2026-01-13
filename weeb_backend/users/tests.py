from rest_framework import status
from rest_framework.test import APITestCase

from .models import CustomUser


class AuthFlowTests(APITestCase):
    def setUp(self):
        self.password = "Password1234"
        self.user = CustomUser.objects.create_user(
            email="member@example.com",
            password=self.password,
            first_name="Member",
            last_name="User",
            is_active=True,
        )

    def test_login_returns_access_and_cookie(self):
        response = self.client.post(
            "/api/auth/login/",
            {"email": self.user.email, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("user", response.data)
        self.assertIn("weeb_refresh", response.cookies)

    def test_refresh_returns_new_access(self):
        login = self.client.post(
            "/api/auth/login/",
            {"email": self.user.email, "password": self.password},
            format="json",
        )
        self.client.cookies = login.cookies

        response = self.client.post("/api/auth/refresh/", {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
