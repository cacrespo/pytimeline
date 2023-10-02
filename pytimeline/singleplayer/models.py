from django.db import models
from engine.models import Card, Game

DEFAULT_DECK_SIZE = 5
DEFAULT_HAND_SIZE = DEFAULT_DECK_SIZE

class SinglePlayerGame(Game):
    n_players = 1

    def start(self):
        """Inicialize a new single player game."""
        self.initialize_deck()
        self.initialize_timeline()
        self.save()
