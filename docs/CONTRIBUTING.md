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
