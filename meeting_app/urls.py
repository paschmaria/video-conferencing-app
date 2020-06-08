from django.urls import path

from .views import *

app_name = 'meeting_app'
urlpatterns = [
    path("", index, name="index"),
]
