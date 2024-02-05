from django.db import models
from engine.models import Card, Game, Timeline


DEFAULT_DECK_SIZE = 5

class SinglePlayerGame(Game):
    # Add additional fields specific to SinglePlayerGame
    deck_size = models.PositiveIntegerField(default=DEFAULT_DECK_SIZE)

    def save(self, *args, **kwargs):
    # Set the default title for SinglePlayerGame
        self.title = "Single Player Game"
        super().save(*args, **kwargs)

    def initialize_timeline(self):
        cards = Card.objects.order_by("?")[:self.deck_size]
        self.timeline = Timeline.objects.create(game=self)
        self.timeline.cards.set(cards)
        self.save()
