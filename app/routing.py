from django.urls import re_path

# from  import ChatConsumer
from .subscription_socker import Subscription_soket

# from django.conf.urls.static import static

websocket_urlpatterns = [
    re_path(r"ws/subscription/$", Subscription_soket.as_asgi()),
]
# if settings.DEBUG:
#       websocket_urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
