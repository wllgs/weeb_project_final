import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import CustomUser


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def active_user(db):
    return CustomUser.objects.create_user(
        email="active@example.com",
        password="Password1234",
        first_name="Active",
        last_name="User",
        is_active=True,
    )


@pytest.fixture
def inactive_user(db):
    return CustomUser.objects.create_user(
        email="inactive@example.com",
        password="Password1234",
        first_name="Inactive",
        last_name="User",
        is_active=False,
    )


@pytest.fixture
def admin_user(db):
    return CustomUser.objects.create_superuser(
        email="admin@example.com",
        password="Password1234",
        first_name="Admin",
        last_name="User",
    )


@pytest.fixture
def auth_headers():
    def _make(user):
        token = RefreshToken.for_user(user).access_token
        return {"HTTP_AUTHORIZATION": f"Bearer {token}"}

    return _make
