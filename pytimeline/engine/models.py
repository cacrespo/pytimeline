from django.db import models


#class Timeline(models.Model):
#	pass

class Card(models.Model):
    date = models.DateTimeField("fecha evento")
    text = models.CharField(max_length=500)

class Game(models.Model):
    title = models.CharField(max_length=256)
    deck = models.ManyToManyField("Card")
#    timeline = models.OneToOneField(
#        Timeline,
#        related_name="game",
#        on_delete=models.CASCADE,
#        null=True,
#    )
    def __str__(self):
        return self.title
