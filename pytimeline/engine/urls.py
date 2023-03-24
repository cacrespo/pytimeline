from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new', views.NewGame.as_view(), name='new_game'),
    path('game_details/<pk>', views.GameDetails.as_view(), name='game_details'),
    path('<pk>/<player_name>', views.UserGameDetails.as_view(), name='user_game_details'),
]
