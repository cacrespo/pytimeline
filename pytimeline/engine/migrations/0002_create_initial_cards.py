import pickle
from datetime import date

from django.db import migrations

def create_initial_cards(apps, schema_editor):
    Card = apps.get_model("engine", "Card")
    with open('engine/data/efemerides_arg.pkl', 'rb') as f:
        data = pickle.load(f)

        for _, (y, t) in data.items():
            Card.objects.create(date=date(int(y), 1, 1), text=t)

def delete_all_cards(apps, schema_editor):
    Card = apps.get_model("engine", "Card")
    Card.objects.all().delete()



class Migration(migrations.Migration):

     dependencies = [
         ('engine', '0001_initial'),
     ]

     operations = [
         migrations.RunPython(create_initial_cards),
     ]
