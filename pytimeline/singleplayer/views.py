from django.shortcuts import render
from . import urls

def index(request):
    return render(request, "singleplayer/singleplayer.html")
