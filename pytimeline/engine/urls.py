from django.urls import path

from . import views

urlpatterns = [
    path('', views.GamesList.as_view(), name='index'),
    path('<pk>/details', views.GameDetails.as_view(), name='game_details'),
    path('<pk>/play', views.PlayGame.as_view(), name='play_game'),
    path('<pk>/the_end', views.EndGame.as_view(), name='end_game'),
    path('<pk>/<player_name>', views.UserGameDetails.as_view(), name='user_game_details'),
]
