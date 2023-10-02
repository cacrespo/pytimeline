from django.db import models


class Timeline(models.Model):
	pass

class Card(models.Model):
	pass

class Game(models.Model):
    title = models.CharField(max_length=256)
    deck = models.ManyToManyField("Card")
    turn = models.PositiveIntegerField(default=0)
    n_players = models.PositiveSmallIntegerField(default=3)
    timeline = models.OneToOneField(
        Timeline,
        related_name="game",
        on_delete=models.CASCADE,
        null=True,
    )
    def __str__(self):
        return self.title
