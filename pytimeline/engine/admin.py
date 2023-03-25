from django.contrib import admin
from .models import Game, Player
from django.urls import reverse
from django.utils.html import format_html


@admin.action(description='Start the selected games')
def start_a_game(modeladmin, request, queryset):
    for game in queryset:
        game.start()

class PlayerInLine(admin.StackedInline):
    model = Player
    extra = 0
    exclude = ['cards']

@admin.display(description='Cards in timeline')
def timeline_size(game):
    t = game.timeline
    return t and str(t.cards.count())


@admin.display(description='Cards in deck')
def timeline_size(game):
    d = game.deck
    return d and str(d.count())


@admin.display(description='Go to details')
def timeline_size(game):
    return format_html(
        '<a href="{}">details</a>',reverse("engine:game_details", kwargs={"pk": game.pk})
    )


    
@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    exclude = ("deck", "turn", "timeline", "last_correct_card","n_players", "discard_deck")
    inlines = [PlayerInLine,]
    actions = [start_a_game]
    list_display = ("pk", "title", "n_players", "deck_size", "initial_hand_size", timeline_size)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    fields = ("name", "game",)
