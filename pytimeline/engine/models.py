import random
from django.db import models


#class Timeline(models.Model):
#	pass

class Card(models.Model):
    date = models.DateTimeField("fecha evento")
    text = models.CharField(max_length=500)

class Game(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=256)
    deck = models.ManyToManyField("Card")

    def deck_random_make(self, n_cards=10):
        """
        Randomly selects a specified number of cards and adds them to the
        game's deck.

        Parameters:
        - n_cards (int): The number of cards to randomly select.
        """
        self.save()
        self.deck.clear()

        # Get a list of IDs of available cards
        card_ids = list(Card.objects.values_list('pk', flat=True))

        # Randomly select n_cards card IDs
        selected_card_ids = random.sample(card_ids, min(n_cards, len(card_ids)))
        selected_cards = Card.objects.filter(pk__in=selected_card_ids)
        self.deck.add(*selected_cards)

#    timeline = models.OneToOneField(
#        Timeline,
#        related_name="game",
#        on_delete=models.CASCADE,
#        null=True,
#    )
