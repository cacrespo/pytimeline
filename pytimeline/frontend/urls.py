from django.urls import path
from django.views.generic import TemplateView
from .views import Home, CreatePlayRoom, PlayRoom, UserPlayView, JoinPlayRoom

urlpatterns = [
    path('board/', Home.as_view()),
    path('board/create', CreatePlayRoom.as_view(), name="create-board"),
    path('board/join', JoinPlayRoom.as_view()),
    path('board/<slug:bord_slug>/', PlayRoom.as_view(), name="play-room"),
    path('board/<slug:bord_slug>/new_user', JoinPlayRoom.as_view()),
    path('board/<slug:bord_slug>/user/1', UserPlayView.as_view(), name="user-play-view"),

]

