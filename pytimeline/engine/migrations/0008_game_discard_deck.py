
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0007_game_title_alter_game_n_players'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='discard_deck',
            field=models.ManyToManyField(related_name='discard_deck', to='engine.card'),
        ),
    ]
