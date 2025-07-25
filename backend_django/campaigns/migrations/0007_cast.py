# Generated by Django 5.1.4 on 2024-12-22 14:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0006_alter_player_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cast',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('character', models.CharField(max_length=30)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campaign_cast', to='campaigns.campaign')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='campaigns_played', to='campaigns.player')),
            ],
            options={
                'verbose_name': 'Cast',
                'verbose_name_plural': 'Cast',
                'ordering': ['campaign', 'player'],
            },
        ),
    ]
