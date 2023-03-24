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
