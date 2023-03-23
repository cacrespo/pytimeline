from django import forms

from engine.models import Game

class NewGameForm(forms.ModelForm):
    player_1 = forms.CharField()
    player_2 = forms.CharField()
    player_3 = forms.CharField()
    class Meta:
        model = Game
        fields = []
