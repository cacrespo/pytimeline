from django.contrib import admin

from engine.models import (
    Card,
    Game,
    Player,
    Timeline,
)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    model = Player
    list_display = ('name',)


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    model = Game
    list_display = ('id', 'deck_size', 'initial_hand_size', 'turn')


@admin.register(Timeline)
class TimelineAdmin(admin.ModelAdmin):
    model = Timeline


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    model = Card
    list_display = ('text', 'date')
