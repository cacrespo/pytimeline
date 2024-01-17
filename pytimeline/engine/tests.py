from django.test import TestCase
from django.db.models import Q

from .models import Game, Card

def create_game(title, n_cards):
    """
    Create a game with the given random number of cards and a specific title.
    """
    game = Game(title=title)
    game.deck_random_make(n_cards=20)

    return game



class CardModelTests(TestCase):
    def test_card_without_info(self):
        """
        Cards have no description or date.
        """

        cards = Card.objects.filter(Q(text="") | Q(date__isnull=True))
        self.assertEqual(cards.count(), 0)

class GameModelTests(TestCase):
    def test_game_different_deck_size_or_title(self):
        """
        General game with different deck size or title.
        """

        test_game = create_game("Test Game", n_cards=20)
        self.assertEqual(test_game.deck.count(), 20)
        self.assertEqual(test_game.title, "Test Game")
