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

    def has_card(self,card):
        return self.cards.filter(pk=card.pk).exists()

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

    def play_a_card(self,card_id,prevYear,postYear):
        card_to_play = Card.objects.get(pk=card_id)
        current_player = self.current_player
        if(current_player.has_card(card_to_play)):
            if(card_to_play.is_between_years(prevYear,postYear)):
                self.timeline.cards.add(card_to_play)
            else:
                another_card=self.deck.first()
                current_player.cards.add(another_card)
                self.deck.remove(another_card)
            current_player.cards.remove(card_to_play) # Sin importar se borra
            self.turn = self.turn + 1
        else:
            raise Exception("No es una carta de jugador en curso")


class Card(models.Model):
    text = models.CharField(max_length=2048)
    date = models.DateField()

    def __str__(self):
        return f'{self.pk}-{self.date.year}-{self.text[0:25]}'

    def is_between_years(self, prevYear, postYear):
        """Chequea si la carta se encuentra en el rango de fechas elegido."""

        # TODO Recibir y comparar fechas
        # return self.date >= date(prevYear, 1, 1) and self.date <= Datetime(postYear, 1, 1)
        return self.date.year >= prevYear and self.date.year <= postYear

