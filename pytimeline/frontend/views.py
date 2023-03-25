# some_app/views.py
from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = "home.html"

class CreatePlayRoom(TemplateView):
    template_name = "create-play-room.html"

class JoinPlayRoom(TemplateView):
    template_name = "create-play-room.html"

class PlayRoom(TemplateView):
    template_name = "play-room.html"

class UserPlayView(TemplateView):
    template_name = "user-play-view.html"

