# pytimeline
Juego similar a Timeline con efemérides de Argentina

# Dev startup

```bash
pip install poetry  # https://python-poetry.org/docs/basic-usage/

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

1. Escribir los modelos
1. Escribir vistas
1. Escribir templates
1. Resolver despliegue