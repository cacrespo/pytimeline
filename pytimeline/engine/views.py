from django.http import HttpResponse
from engine.forms import NewGameForm
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView


from engine.models import Game

def index(request):
    return HttpResponse("Bienvenido al juegazo. acá el listado de juegos.")


def new_game(request):
    return HttpResponse("New game")


class NewGame(CreateView):
    template_name = 'new_game.html'
    model = Game
    form_class = NewGameForm

    def get_success_url(self):
        form_data = self.get_form_kwargs()["data"]
        player_1_name = form_data["player_1"]
        player_2_name = form_data["player_2"]
        player_3_name = form_data["player_3"]


        self.object.start([player_1_name, player_2_name, player_3_name])
        return super().get_success_url()


class GameDetails(DetailView):
    model = Game


class UserGameDetails(DetailView):
    model = Game
    template_name = "engine/user_game_details.html"