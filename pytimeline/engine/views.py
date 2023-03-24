from django.http import HttpResponse
from engine.forms import NewGameForm, PlayCardForm
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView,BaseUpdateView


from engine.models import Game

def index(request):
    return HttpResponse("Bienvenido al juegazo. acá el listado de juegos.")


def new_game(request):
    return HttpResponse("New game")


class NewGame(CreateView):
    template_name = 'new_game.html'
    model = Game
    form_class = NewGameForm

    def clean(self):
        cleaned_data = super().clean()
        player_names = [
            cleaned_data.get("player_1"),
            cleaned_data.get("player_2"),
            cleaned_data.get("player_3"),
        ]
        if len(list(filter(None, map(str.strip, player_names)))) == 0:
            raise ValidationError("All usernames are empty!")
        
        cleaned_data["n_players"] = 3

    def get_success_url(self):
        form_data = self.get_form_kwargs()["data"]
        player_1_name = form_data["player_1"]
        player_2_name = form_data["player_2"]
        player_3_name = form_data["player_3"]

        self.object.start([player_1_name, player_2_name, player_3_name])
        return super().get_success_url()


class GameDetails(DetailView):
    model = Game


class UserGameDetails(UpdateView):
    model = Game
    form_class = PlayCardForm
    template_name = "engine/user_game_details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["player"] = self.object.players.get(name=self.kwargs['player_name'])
        return context

class PlayGame(BaseUpdateView):
    model = Game
    form_class = PlayCardForm

    def form_valid(self,form):
        card_id = self.request.POST['selection']
        before_year = self.request.POST['before_year']
        after_year = self.request.POST['after_year']
        self.object.play_a_card(card_id,before_year,after_year)
        return super().form_valid(form)