import api.models as models
from rest_framework import authentication, exceptions


class CustomAuthenticator(authentication.BaseAuthentication):
    def authenticate(self, request):
        header_token = request.META.get('HTTP_TOKEN')
        if header_token is None:
            return None
        try:
            user = models.User.objects.get(token=header_token)
            user.is_authenticated = True
        except models.User.DoesNotExist:
            raise exceptions.AuthenticationFailed('invalid token')
        return user, None
