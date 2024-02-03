from django.db import models


class Timeline(models.Model):
	cards = models.ManyToManyField("Card")

class Card(models.Model):
    date = models.DateTimeField("fecha evento")
    text = models.CharField(max_length=500)

class Game(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=256)
    deck = models.ManyToManyField("Card")

    timeline = models.OneToOneField(
        Timeline,
        related_name="game",
        on_delete=models.CASCADE,
        null=True,
    )
