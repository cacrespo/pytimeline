from collections import namedtuple
from django.http import HttpResponse
from engine.forms import NewGameForm, PlayCardForm
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, ModelFormMixin, BaseUpdateView
from django.urls import reverse
from engine.models import Game


MAX_YEAR = 9999
DIVIDER = "/"


class GameDetails(DetailView):
    model = Game


TimelineElement = namedtuple(
    "TimelineElement", 
    ("before_year", "card", "after_year")
)

def get_first_position_marker(card):
    """"""
    return f"{-MAX_YEAR}{DIVIDER}{card.date.year}"


def get_position_marker(prev, post):
    """"""
    return f"{prev.date.year}{DIVIDER}{post.date.year}"


def get_last_position_marker(card):
    """"""
    return f"{card.date.year}{DIVIDER}{MAX_YEAR}"


def get_timeline_context(cards, last_correct_card):
        first_card = cards[0]
        # Arranco con un marker y la primer carta
        if len(cards) == 1:
            timeline_context = [
                TimelineElement(
                    get_first_position_marker(first_card),
                    first_card,
                    get_last_position_marker(first_card)
                )  
            ]
        else:

            post_marker = get_position_marker(cards[0], cards[1])
            first_card.last_correct_card = (first_card.pk == last_correct_card.pk)
            timeline_context = [
                TimelineElement(
                    get_first_position_marker(cards[0]),
                    first_card,
                    post_marker
                )
            ]

            for i in range(1, len(cards) - 1):
                # Si hay más cartas, meto un marker y la carta
                card = cards[i]
                card.last_correct_card = (card.pk == last_correct_card.pk)
                
                next_card = cards[i+1]
                new_marker = get_position_marker(card, next_card)
                timeline_context.append(
                    TimelineElement(
                        post_marker,
                        card,
                        new_marker                        
                    )  
                )
                post_marker = new_marker
            
            
            last_card = cards[-1]
            last_card.last_correct_card = (last_card.pk == last_correct_card.pk)
            timeline_context.append(
                TimelineElement(
                    post_marker,
                    last_card,
                    get_last_position_marker(cards[-1])
                )  
            )

        return timeline_context


class UserGameDetails(DetailView, ModelFormMixin):
    model = Game
    form_class = PlayCardForm
    template_name = "engine/user_game_details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["player"] = self.object.players.get(name=self.kwargs['player_name'])
        cards = list(self.object.timeline.cards.order_by("date__year"))
        context["timeline_context"] = get_timeline_context(cards, self.object.last_correct_card)
        context["is_active_player"] = context["player"].pk == self.object.current_player.pk

        return context

class PlayGame(BaseUpdateView):
    model = Game
    form_class = PlayCardForm

    def form_valid(self,form):
        card_id = self.request.POST['selection']
        position = self.request.POST['position']
        before_year, after_year = map(int, position.split(DIVIDER))

        self.object.play_a_card(card_id, before_year, after_year)

        return super().form_valid(form)
    
    def get_success_url(self):
        
        if self.object.finished:
            url = reverse(
                "engine:end_game", 
                kwargs={
                    "pk": self.object.pk
                }
            )
        else:
            url = reverse(
                "engine:user_game_details", 
                kwargs={
                    "pk": self.object.pk, 
                    "player_name": self.request.POST.get("player_name")
                }
            )

        return url

class EndGame(DetailView):
    model = Game
    template_name = "engine/end_game.html"