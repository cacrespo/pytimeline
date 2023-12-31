from django.test import TestCase
from django.db.models import Q

from .models import Game, Card

def create_game(title, cards):
    """
    Create a game with the given random number of cards and a specific title.
    """
    game = Game(title=title)


class CardModelTests(TestCase):
    def test_card_without_info(self):
        """
        Cards have no description or date.
        """

        cards = Card.objects.filter(Q(text="") | Q(date__isnull=True))
        self.assertEqual(cards.count(), 0)


# Check Game without deck
