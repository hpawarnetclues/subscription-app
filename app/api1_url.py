from django.urls import path
from . import api1_views as views

urlpatterns = [path("", views.temp1, name="api_test")]
