from django.urls import path

from . import views

app_name = "singleplayer"
urlpatterns = [
    path("", views.index, name="singleplayer"),
    path("play", views.play, name="singleplayer_play"),
]
