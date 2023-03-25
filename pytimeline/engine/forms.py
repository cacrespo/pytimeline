from django import forms

from engine.models import Game

class NewGameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ["title", "deck_size", "initial_hand_size", "n_players"]

class MyChoiceField(forms.ChoiceField):
    def validate(self,value):
        pass

class PlayCardForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = []

    CHOICES = [(i, 'Card ' + i) for i in map(str, range(1, 6))]

    player_name = forms.HiddenInput()
    selection = MyChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES,
    )

    def clean_selection(self):
        return self.cleaned_data['selection']