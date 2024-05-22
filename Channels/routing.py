from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # SndCht -> Send Chat
    re_path(r'SndCht/(?P<group_name>[\w-]+)/(?P<token>[^/]+)/$', consumers.ChatConsumer.as_asgi()),
]