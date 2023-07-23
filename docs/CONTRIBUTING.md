# Cómo contribuir al proyecto

¡Muchas gracias por tu interés en el proyecto!

Primero, elige una [issue](https://github.com/cacrespo/pytimeline/issues) (o 
crea una con sugerencias, ideas, consejos...) y espera a que se te asigne.

Luego clona el repositorio y trabaja en la rama de desarrollo.

## Configuración

Te recomendamos encarecidamente que crees un entorno virtual, lo actives e 
instales los requisitos.

    $ python3 -m venv env
    $ source env/bin/activate
    (env) $ pip install -r requirements-dev.txt

## Ejecutar pruebas

Ingresa al entorno virtual y ejecuta:

    (env) $ python -m pytest tests/

## Diagrama general de la aplicación

pytimeline/ 
    |-- pytimeline/
        |-- pytimeline/
        |-- static/
        |-- data/
        |-- engine/
        |-- pages/
        |-- singleplayer/
        |-- multiplayer/
    |-- docs/

| File or Directory | Purpose |
| --- | --- |
| `pytimeline` | Files del proyecto |
| `docs` | Documentación |
| `pytimeline/pytimeline` | Configuración general |
| `pytimeline/static` | Archivos estáticos de todas las apps (images, css, etc.) |
| `pytimeline/data` | Extracción y data de efemérides |
| `pytimeline/engine` | Motor de juego |
| `pytimeline/pages` | Sitio web |
| `pytimeline/singleplayer` | Variante un jugador |
| `pytimelinei/multiplayer` | Variante multijugador |
