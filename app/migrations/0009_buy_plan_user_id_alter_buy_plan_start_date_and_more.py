# Generated by Django 5.0.6 on 2024-08-01 06:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_buy_plan_start_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='buy_plan',
            name='user_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 1, 6, 34, 21, 234042, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 1, 6, 34, 21, 234042, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 1, 6, 34, 21, 218417, tzinfo=datetime.timezone.utc)),
        ),
    ]
