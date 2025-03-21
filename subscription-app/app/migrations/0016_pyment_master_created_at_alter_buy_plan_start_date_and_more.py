# Generated by Django 5.0.6 on 2024-08-14 07:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_pyment_master_alter_buy_plan_start_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pyment_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 14, 7, 14, 16, 425710, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 14, 7, 14, 16, 424710, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 14, 7, 14, 16, 423711, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 14, 7, 14, 16, 423711, tzinfo=datetime.timezone.utc)),
        ),
    ]
