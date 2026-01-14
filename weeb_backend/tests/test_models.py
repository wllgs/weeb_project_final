import pytest

from weeb_app.models import Article, ContactMessage


@pytest.mark.django_db
def test_article_str():
    article = Article.objects.create(title="Hello", content="Body")
    assert str(article) == "Hello"


@pytest.mark.django_db
def test_contact_message_str():
    message = ContactMessage.objects.create(
        email="user@example.com",
        message="Hi",
        first_name="Jane",
        last_name="Doe",
    )
    assert "Jane Doe" in str(message)
