import pytest
from rest_framework import status

from weeb_app.models import Article


@pytest.mark.django_db
def test_active_member_can_create_article(api_client, active_user, auth_headers):
    response = api_client.post(
        "/api/articles/",
        {"title": "My post", "content": "Hello", "is_published": False},
        format="json",
        **auth_headers(active_user),
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["author"]["email"] == active_user.email
    assert response.data["is_published"] is False


@pytest.mark.django_db
def test_inactive_member_cannot_create_article(api_client, inactive_user, auth_headers):
    response = api_client.post(
        "/api/articles/",
        {"title": "Draft", "content": "Content", "is_published": False},
        format="json",
        **auth_headers(inactive_user),
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_author_sees_own_drafts(api_client, active_user, auth_headers):
    Article.objects.create(
        title="Draft 1",
        content="Secret",
        author=active_user,
        is_published=False,
    )
    Article.objects.create(
        title="Public 1",
        content="World",
        author=active_user,
        is_published=True,
    )

    response = api_client.get("/api/articles/", format="json", **auth_headers(active_user))
    assert response.status_code == status.HTTP_200_OK
    titles = {item["title"] for item in response.data["results"]}
    assert "Draft 1" in titles
    assert "Public 1" in titles
