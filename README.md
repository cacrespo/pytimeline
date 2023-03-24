# pytimeline
Juego similar a Timeline con efemérides de Argentina

# Dev startup

```bash
pip install Django==4.1
pip install django_extensions  # https://python-poetry.org/docs/basic-usage/

```

## Vistas con sus templates

* / : Listado de Games
* /start : 
    * GET : Form de carga de usuarios y parámetros del juego
    * POST : Inicializa el juego. redirect a Start-success

* /start-success/<gameID>/ :  muestra IDs de usuarios

* /<gameID>/<userID>/ : 
    * GET : Si el juego está en marcha: state privado del usuario userID + timeline + current player. Si el juego terminó, te hace forward al ENDgame
    * POST : juega y te manda a la misma página.

* /<gameID>/end : muestra tabla de resultados

# Tareas

1. Escribir los modelos (hay versiones iniciales)
1. Escribir vistas: falta la lógica principal del juego y la de cada jugador
1. Escribir templates: el de cada jugar (polling) y botón jugar. Amor a todos.
1. Resolver despliegue: TBD
1. Features, features, features

# Features

* Single player
* N jugadores
* Configuración dinámica del juego (nombre de sala, tamaño del mazo, etc)
* Amor a las pantallas actuales
* Sistema de puntos
* API rest para habilitar múltiples clientes
* Stats y pantalla de jugadas históricas por jigador
* AuthN & AuthZ
* Ranking de jugadores
* Imágenes en las cards
* Cargar más cards
* Categorías en las cards (poder configurar mazos con múltiples categorías)
* Frotends buena onda
* 

# Pseudo-código brainstorm inicial

```python
print("Hello world!")

def load_initial_DB():
    pass

class Cards(Model):
    pass

def initialize_deck(deck_size):
    """Devuelve N cartas con algún criterio."""
    return Cards.objects.random_list(deck_size)

class Player(Model):
    name
    cards = many2many(Card)
    game = FK(Game, related_name="players")  # Un jugador tiene una sola partida.


class Timeline(Model):
    FK(Game)
    cards = many2many(Card)

    def insert_card(card):
        pass


class Game:
    deck_size
    initial_hand_size

    deck = many2many(Card)
    turn = 0

    def initialize_deck():
        cards = Cards.objects.random_list(deck_size)
        self.deck.add(cards)

    def register_user(name):
        """"""
        # Agrega un usuario al state y saca cartas del deck para darle.
        p = self.users.create(name)
        players_cards = self.extract_cards_from_deck()
        p.add(players_cards)

    def start(self, users):
        """Inicialize a new game for the given users."""
        self.deck.add(inicialize_deck())
        for u in users:
            self.register_user(u)
        self.timeline.add(self.first_from_deck()))

    def play_turn(card, position):
        """
        Play the given card in the given position.

        1) Controla que la card sea del jugador actual
        2) le saca la carta al jugador
        3) si está bien ubicada y actualiza el timeline y devuelve SUCCESS 
           si NO esta bien ubicada devuelve FAIL
        4) En caso de FAIL, entrega la primer carte del deck al jugador

        Mantiene la lógica del usuario actual.
        """
        pass

# vistas

def new_game(users):
    game = Game.objects.create()
    game.start(users)
    return game.pk

serializers_map = {
    SUCCESS: serialize_successful_result(result),
    FAIL: return_value = serialize_failed_result(result) 
}

def play(game_id, card, position):
    game = Game.objects.get(game_id)
    result = game.play_turn(card, position)
    serialize = serializers_map[result]
    return serialize(result)

def status()
```