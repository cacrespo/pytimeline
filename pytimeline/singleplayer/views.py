from django.shortcuts import render
from . import urls
from singleplayer.models import SinglePlayerGame

def index(request):
    game = SinglePlayerGame()
    game.initialize_timeline()
    return render(request, "singleplayer/singleplayer.html", {'game': game})
