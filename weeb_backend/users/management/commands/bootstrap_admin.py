from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    help = "Cree un superuser admin si absent (via env)."

    def handle(self, *args, **options):
        email = "admin@example.com"
        password = "AdminPassword1234"

        if CustomUser.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING("Admin deja present."))
            return

        CustomUser.objects.create_superuser(
            email=email,
            password=password,
            first_name="Admin",
            last_name="Weeb",
        )
        self.stdout.write(self.style.SUCCESS("Admin cree avec succes."))
