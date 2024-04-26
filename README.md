# pytimeline
Juego inspirado en Timeline con efemérides de Argentina.

> **Note**
> 
> Esta iniciativa nace en el marco del PyCamp 2023 - Corrientes (AR).
> 
> ¿No sabés qué es un PyCamp? [Acá](docs/PYCAMP.md) hay más información 😉)

Nuestra intención es ofrecer un espacio lúdico que ayude a las personas a 
despertar curiosidad e interes por ~adquirir nuevos conocimientos~ cosas.

Por el momento vamos a conmemorar aniversarios y eventos interesantes ligados 
a la historia argentina. Tal vez en un futuro podamos abordar otros tópicos.

## Dinámica de juego

A grandes rasgos, el juego consiste en ordenar correctamente una serie de
sucesos históricos que cada jugador recibe de forma aleatoria. El primer
participante que logra hacerlo gana la partida.

Contamos con dos modalidades de juego:
- [Single Player](docs/SINGLEPLAYER.md)
- [Multiplayer](docs/MULTIPLAYER.md)

## Inicializar la aplicación
```bash
python pytimeline/manage.py runserver --settings=pytimeline.settings.prod
```

## ¿Querés colaborar?
Revisá los issues abiertos y pedí para que se te asigne uno. 
[Acá](docs/CONTRIBUTING.md) más información al respecto.
