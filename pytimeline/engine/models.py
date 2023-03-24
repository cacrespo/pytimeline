from datetime import date


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

    def __str__(self):
        return self.name


class Timeline(models.Model):
    cards = models.ManyToManyField("Card")

class Game(models.Model):
    deck_size = models.PositiveIntegerField(default=DEFAULT_DECK_SIZE)
    initial_hand_size = models.PositiveIntegerField(default=DEFAULT_HAND_SIZE)
    deck = models.ManyToManyField("Card")
    turn = models.PositiveIntegerField(default=0)
    n_players = models.PositiveSmallIntegerField(default=0)
    timeline = models.OneToOneField(
        Timeline,
        related_name="game",
        on_delete=models.CASCADE,
        null=True,
    )

    def get_absolute_url(self):
        return reverse('engine:game_details', kwargs={'pk': self.pk})

    @property
    def current_player(self):
        print("...............", self.turn, self.n_players)
        player_idx = self.turn % self.n_players
        return self.players.order_by("id")[player_idx]

    def register_player(self, name):
        """Agrega un usuario al state y saca cartas del deck para darle."""
        p = Player.objects.create(name=name, game=self)

        cards_selected = self.deck.all()[0:self.initial_hand_size]
        p.cards.set(cards_selected)
        self.deck.remove(*cards_selected)

    def initialize_deck(self):
        cards = Card.objects.order_by("?")[:self.deck_size]
        self.deck.set(cards)

    def initialize_timeline(self):
        first_card = self.deck.first()
        t = Timeline.objects.create(game=self)
        self.timeline = t
        self.save()
        self.timeline.cards.add(first_card)
        self.deck.remove(first_card)

    def start(self, users):
        """Inicialize a new game for the given users."""

        self.initialize_deck()
        for u in users:
            self.register_player(u)
        self.n_players = len(users)
        self.initialize_timeline()

    def __str__(self):
        return f"{self.id} (Deck Size {self.deck_size})"

class Card(models.Model):
    text = models.CharField(max_length=2048)
    date = models.DateField()

    def is_between_years(self, prevYear, postYear):
        """Chequea si la carta se encuentra en el rango de fechas elegido."""

        # TODO Recibir y comparar fechas
        # return self.date >= date(prevYear, 1, 1) and self.date <= Datetime(postYear, 1, 1)
        return self.date.year >= prevYear and self.date.year <= postYear

