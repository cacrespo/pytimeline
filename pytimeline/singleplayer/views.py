from django.contrib.sessions.models import Session
from django.shortcuts import render
from . import urls
from singleplayer.models import SinglePlayerGame
from engine.models import Card
from django.db.models import Case, When


def index(request):
    return render(request, "singleplayer/singleplayer.html")


def play(request):
    # Check if the game instance is already stored in the session
    if 'game_id' in request.session:
        game_id = request.session['game_id']
        game = SinglePlayerGame.objects.get(pk=game_id)
    else:
        # Create a new game instance if it doesn't exist in the session
        game = SinglePlayerGame()
        game.initialize_timeline()

        # Store the game instance ID in the session
        request.session['game_id'] = game.pk

    return render(request, "singleplayer/singleplayer_play.html", {'game': game})


def end(request):
    if request.method == 'POST':
        answers = request.POST.get('answer').split(",")
        answers = list(map(int, answers))
        _order = Case(*(When(id=id, then=pos)
                      for pos, id in enumerate(answers, start=1)))
        cards = Card.objects.filter(id__in=answers).order_by(_order)
        ordered_answers = [card.id for card in cards.order_by('date')]
        results = zip(cards, ordered_answers)
    return render(request, "singleplayer/singleplayer_end.html", {'results': results})
