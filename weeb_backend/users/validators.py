from django.core.exceptions import ValidationError


class UppercaseValidator:
    message = "Le mot de passe doit contenir au moins une lettre majuscule."
    code = 'password_no_upper'

    def validate(self, password, user=None):
        if not any(char.isupper() for char in password):
            raise ValidationError(self.message, code=self.code)

    def get_help_text(self):
        return self.message


class NumberValidator:
    message = "Le mot de passe doit contenir au moins un chiffre."
    code = 'password_no_number'

    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError(self.message, code=self.code)

    def get_help_text(self):
        return self.message
