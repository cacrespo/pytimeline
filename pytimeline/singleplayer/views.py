from django.shortcuts import render
from . import urls
from singleplayer.models import SinglePlayerGame

def index(request):
    game = SinglePlayerGame()
    return render(request, "singleplayer/singleplayer.html", {'game': game})
