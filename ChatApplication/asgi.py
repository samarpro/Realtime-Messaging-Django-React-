"""
ASGI config for ChatApplication project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from Channels.routing import websocket_urlpatterns
from Channels.middleware import UserAdderMiddleware
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChatApplication.settings')

django_asgi_application = get_asgi_application()

# channels is a extension to django that makes handling multiple communication easier.
# Which also means it allows us to work with websocket
# The concept of channels in context of websocket doesn't exist.

application = ProtocolTypeRouter({ # routes specific protocol to specific application
    'http':django_asgi_application,
    'websocket':AllowedHostsOriginValidator(UserAdderMiddleware(URLRouter(routes=websocket_urlpatterns)))
})