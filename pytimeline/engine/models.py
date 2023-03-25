from datetime import date
from django.db import models
from django.urls import reverse


DEFAULT_DECK_SIZE = 60
DEFAULT_HAND_SIZE = 5


class CardNotInUsersHand(Exception):
    pass


class Player(models.Model):
    name = models.CharField(max_length=64)
    cards = models.ManyToManyField("Card")
    game = models.ForeignKey(
        "engine.Game",
        related_name="players",
        on_delete=models.CASCADE,
    ) # Un jugador tiene una sola partida.

    # TODO: Agregar restricción de unique_together(name, game)

    def __str__(self):
        return self.name

    def has_card(self,card):
        return self.cards.filter(pk=card.pk).exists()

class Timeline(models.Model):
    cards = models.ManyToManyField("Card")

class Game(models.Model):
    title = models.CharField(max_length=256)
    deck_size = models.PositiveIntegerField(default=DEFAULT_DECK_SIZE)
    initial_hand_size = models.PositiveIntegerField(default=DEFAULT_HAND_SIZE)
    deck = models.ManyToManyField("Card")
    turn = models.PositiveIntegerField(default=0)
    n_players = models.PositiveSmallIntegerField(default=3)
    timeline = models.OneToOneField(
        Timeline,
        related_name="game",
        on_delete=models.CASCADE,
        null=True,
    )
    last_correct_card = models.OneToOneField(
        "Card",
        related_name="last_correct_in_games",
        on_delete=models.CASCADE,
        null=True,
    )
    discard_deck = models.ManyToManyField("Card",related_name='discard_deck')

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('engine:game_details', kwargs={'pk': self.pk})

    @property
    def current_player(self):
        player_idx = self.turn % self.n_players
        return self.players.order_by("id")[player_idx]
    
    @property
    def finished(self):
        user_won = self.players.filter(cards=None).exists()
        return user_won or self.deck_is_empty()

    def get_winner(self):
        return self.players.filter(cards=None).exists() and self.players.get(cards=None) or None

    def deck_is_empty(self):
        return self.deck.count() == 0

    def initialize_player(self, player):
        """Agrega un usuario al state y saca cartas del deck para darle."""
        cards_selected = self.deck.all()[0:self.initial_hand_size]
        player.cards.set(cards_selected)
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

    def start(self):
        """Inicialize a new game for the given users."""
        self.initialize_deck()
        players = Player.objects.filter(game=self)
        for p in players:
            self.initialize_player(p)
        self.n_players = players.count()
        self.initialize_timeline()
        self.save()

    def _play_existing_card(self, card_to_play, prevYear, postYear):
        if(card_to_play.is_between_years(prevYear, postYear)):
            self.timeline.cards.add(card_to_play)
            self.last_correct_card = card_to_play
            print(f"····\tJugó bien!")
        else:
            another_card=self.deck.first()
            self.current_player.cards.add(another_card)
            self.deck.remove(another_card)
            self.discard_deck.add(card_to_play)
            print(f"····\tJugó mal :-(")
        self.current_player.cards.remove(card_to_play) # Sin importar se borra
        self.turn = self.turn + 1

    def play_a_card(self, card_id, prevYear, postYear):
        card_to_play = Card.objects.get(pk=card_id)
        # TODO:  validar que esos años están en las cartas del Timeline
        if self.current_player.has_card(card_to_play):
            print(f"···· Jugando {self.current_player.name}: quiere jugar {card_to_play.date.year} entre {prevYear} y {postYear}")
            self._play_existing_card(card_to_play, prevYear, postYear)   
        else:
            print("···· ERROR: intentando jugar carta que no tiene el jugador actual")
            raise CardNotInUsersHand(f"El jugador {self.current_player.name} no tiene la carta {card_id}")


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

