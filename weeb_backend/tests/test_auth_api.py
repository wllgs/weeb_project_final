import pytest
from rest_framework import status


@pytest.mark.django_db
def test_login_success(api_client, active_user):
    response = api_client.post(
        "/api/auth/login/",
        {"email": active_user.email, "password": "Password1234"},
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "user" in response.data
    assert "weeb_refresh" in response.cookies


@pytest.mark.django_db
@pytest.mark.parametrize(
    "payload, expected_status",
    [
        ({"email": "member@example.com", "password": "bad"}, status.HTTP_401_UNAUTHORIZED),
        ({"email": "", "password": "Password1234"}, status.HTTP_400_BAD_REQUEST),
        ({}, status.HTTP_400_BAD_REQUEST),
    ],
)
def test_login_invalid_payloads(api_client, payload, expected_status):
    response = api_client.post("/api/auth/login/", payload, format="json")
    assert response.status_code == expected_status


@pytest.mark.django_db
def test_refresh_returns_access(api_client, active_user):
    login = api_client.post(
        "/api/auth/login/",
        {"email": active_user.email, "password": "Password1234"},
        format="json",
    )
    api_client.cookies = login.cookies

    response = api_client.post("/api/auth/refresh/", {}, format="json")
    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
