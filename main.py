import pickle
import random
import time

# load events
with open('saved_dictionary.pkl', 'rb') as f:
    data = pickle.load(f)

# select five events
random_index = random.sample(sorted(data), 5)
events_selected = dict((k, data[k]) for k in random_index if k in data)


def validate_years(events_selected):
    years = []
    keys = []
    for i in events_selected.keys():
        if events_selected[i][0] in years:
            keys.append(i)
        else:
            years.append(events_selected[i][0])

    [events_selected.pop(key) for key in keys]

    random_index = random.sample(sorted(data), len(keys))

    for i in random_index:
        events_selected[i] = data[i]


def check_response(event, response, display):
    global events_display
    events_player = events_display.copy()
    events_player.append(response + " " + event[1])
    events_display.append(event[0] + " " + event[1])

    events_player.sort()
    events_display.sort()

    if event[0] == response:
        print("¡Sos un fenómeno! Es el año exacto.")
        time.sleep(1)

    elif [s[4:] for s in events_player] == [s[4:] for s in events_display]:
        print('Bien ubicado amiguiti!')
        time.sleep(1)
    else:
        events_display.remove((event[0] + " " + event[1]))
        print('Le pifiaste amigache!')
        print(event[0], "es la respuesta correcta.")
        time.sleep(3)


def vis_responses(responses):
    print("\n"*100)
    print("""
***********
* TABLERO *
***********
""")
    for i in responses:
        print(i, "\n")
    print("*"*11)
    print("\n")


validate_years(events_selected)

# Inicia el juego

print("""P Y T I M E L I N E      A R G E N T U M
------------------------------------------
¿Qué tanto sabes de efemérides argentinas?

Tienes que ordenar cronológicamente los eventos que se van presentando.
Si no aciertas el año pero la sucesión de hechos es correcta:
la respuesta también es válida!
""")
input("¿Empezamos?")

events_display = []

for i, j in enumerate(events_selected):
    if i == 0:
        events_display.append(
            events_selected[j][0] + " " + events_selected[j][1])
    else:
        vis_responses(events_display)
        print(f'¿En qué año...\n', events_selected[j][1])
        response = input("...?\n")
        check_response(events_selected[j], response, events_display)
vis_responses(events_display)
