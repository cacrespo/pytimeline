from django.contrib import admin
from .models import Game, Player


@admin.action(description='Start the selected games')
def start_a_game(modeladmin, request, queryset):
    for game in queryset:
        game.start()

class PlayerInLine(admin.StackedInline):
    model = Player
    extra = 0
    exclude = ['cards']

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    exclude = ("deck", "turn", "timeline", "last_correct_card","n_players")
    inlines = [PlayerInLine,]
    actions = [start_a_game]


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    fields = ("name", "game",)
