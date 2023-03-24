from django import forms

from engine.models import Game

class NewGameForm(forms.ModelForm):
    player_1 = forms.CharField()
    player_2 = forms.CharField()
    player_3 = forms.CharField()
    class Meta:
        model = Game
        fields = ["n_players"]
        widgets = {
            'n_players': forms.HiddenInput(),
        }

class MyChoiceField(forms.ChoiceField):
    def validate(self,value):
        pass

class PlayCardForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = []

    CHOICES = [(i, 'Card ' + i) for i in map(str, range(1, 6))]

    selection = MyChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES,
    )

    def clean_selection(self):
        return self.cleaned_data['selection']