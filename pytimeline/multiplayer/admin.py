from django.contrib import admin
from .models import Game, Player
from django.urls import reverse
from django.utils.html import format_html
from django.contrib import messages
from multiplayer.models import GameWithNoUsers

@admin.action(description='Start the selected games')
def start_a_game(modeladmin, request, queryset):
    for game in queryset:
        try:
            game.start()
        except GameWithNoUsers as err:
            messages.error(request, str(err))

class PlayerInLine(admin.StackedInline):
    model = Player
    extra = 0
    exclude = ['cards']

@admin.display(description='Cards in timeline')
def timeline_size(game):
    t = game.timeline
    return t and str(t.cards.count())


@admin.display(description='Cards in deck')
def cards_in_deck(game):
    d = game.deck
    return d and str(d.count())


@admin.display(description='Go to details')
def goto_details(game):
    return format_html(
        '<a href="{}">details</a>',reverse("engine:game_details", kwargs={"pk": game.pk})
    )


@admin.display(description='Winner')
def winner(game):
    return game.get_winner()


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    exclude = ("deck", "turn", "timeline", "last_correct_card","n_players", "discard_deck")
    inlines = [PlayerInLine,]
    actions = [start_a_game]
    list_display = ("pk", "title", "n_players", winner, timeline_size, cards_in_deck,  "deck_size", "initial_hand_size", goto_details)


@admin.display(description='Game')
def game_change_url(player):
    return format_html(
        '<a href="{}">{}</a>', reverse('admin:engine_game_change', args=(player.game.pk,)), player.game
    )

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    fields = ("name", "game",)
    list_display = ("pk", "name", game_change_url,)
