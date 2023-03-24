from django.db import models

from django.urls import reverse


DEFAULT_DECK_SIZE = 60
DEFAULT_HAND_SIZE = 5


class Player(models.Model):
    name = models.CharField(max_length=64)
    cards = models.ManyToManyField("Card")
    game = models.ForeignKey(
        "engine.Game",
        related_name="players",
        on_delete=models.CASCADE,
    ) # Un jugador tiene una sola partida.


class Game(models.Model):
    deck_size = models.PositiveIntegerField(default=DEFAULT_DECK_SIZE)
    initial_hand_size = models.PositiveIntegerField(default=DEFAULT_HAND_SIZE)
    deck = models.ManyToManyField("Card")
    current = models.PositiveIntegerField(default=0)

    def get_absolute_url(self):
        return reverse('engine:game_details', kwargs={'pk': self.pk})


    def register_player(self, name):
        """Agrega un usuario al state y saca cartas del deck para darle."""
        p = Player.objects.create(name=name, game=self)

        cards_selected = self.deck.all()[0:self.initial_hand_size]
        p.cards.set(cards_selected)
        self.deck.remove(*cards_selected)


    def initialize_deck(self):
        cards = Card.objects.order_by("?")[:self.deck_size]
        [self.deck.add(c) for c in cards]


    def start(self, users):
        """Inicialize a new game for the given users."""

        self.initialize_deck()
        for u in users:
            self.register_user(u)
        #self.timeline.add(self.first_from_deck()))
        print("······· Start " + str(users))

class Card(models.Model):
    text = models.CharField(max_length=2048)
    date = models.DateField()

