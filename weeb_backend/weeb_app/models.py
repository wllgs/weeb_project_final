from django.conf import settings
from django.db import models


class Article(models.Model):
    """Article de blog basique pour Weeb."""

    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="articles",
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Message de contact + evaluation de satisfaction (0 = -, 1 = +)."""

    SATISFACTION_CHOICES = (
        (0, "Negatif"),
        (1, "Positif"),
    )

    first_name = models.CharField(max_length=120, blank=True, default="")
    last_name = models.CharField(max_length=120, blank=True, default="")
    name = models.CharField(max_length=240, blank=True, default="")
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default="")
    message = models.TextField()
    newsletter_opt_in = models.BooleanField(default=False)
    satisfaction = models.PositiveSmallIntegerField(
        choices=SATISFACTION_CHOICES,
        default=0,
        help_text="0 = negatif, 1 = positif",
    )
    satisfaction_score = models.FloatField(
        help_text="Probabilite estimee d'etre positif (0..1).",
        default=0.5,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        display_name = (
            self.name.strip()
            or f"{self.first_name} {self.last_name}".strip()
            or "Anonyme"
        )
        return f"{display_name} <{self.email}>"
