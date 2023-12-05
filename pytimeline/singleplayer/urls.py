from django.urls import path

from . import views

app_name = "singleplayer"
urlpatterns = [
    path("", views.index, name="singleplayer"),
]
