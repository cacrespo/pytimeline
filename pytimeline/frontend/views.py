# some_app/views.py
from django.views.generic import TemplateView
from django.views.generic.detail import DetailView

from engine.models import Game


class Home(TemplateView):
    template_name = "home.html"

class CreatePlayRoom(TemplateView):
    template_name = "create-play-room.html"

class JoinPlayRoom(TemplateView):
    template_name = "join-play-room.html"

    def get_context_data(self, **kwargs):
        kwargs = super(JoinPlayRoom, self).get_context_data(**kwargs)
        return kwargs
        


class PlayRoom(DetailView):
    template_name = "play-room.html"
    model = Game

class UserPlayView(TemplateView):
    template_name = "user-play-view.html"

