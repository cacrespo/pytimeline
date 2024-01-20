import random

from django.db import transaction
from .models import Game, Card

def create_game(title, n_cards):
    """
    Create a new game with a specified title and a random selection of cards.

    Parameters:
    - title (str): The title of the game.
    - n_cards (int): The number of cards to include in the game.

    Returns:
    - Game: The created Game instance.
    """
    with transaction.atomic():
        game = Game.objects.create(title=title)

        # Get a list of IDs of available cards
        card_ids = list(Card.objects.values_list('pk', flat=True))

        # Randomly select n_cards IDs and assign to game's the deck
        selected_card_ids = random.sample(card_ids, min(n_cards, len(card_ids)))
        selected_cards = Card.objects.filter(pk__in=selected_card_ids)
        game.deck.add(*selected_cards)

    return game
