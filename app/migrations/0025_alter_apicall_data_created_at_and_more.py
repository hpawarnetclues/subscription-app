# Generated by Django 5.0.6 on 2024-08-21 04:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0024_alter_apicall_data_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apicall_data',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 21, 4, 26, 47, 456370, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 21, 4, 26, 47, 456370, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 21, 4, 26, 47, 456370, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='pyment_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 21, 4, 26, 47, 456370, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 21, 4, 26, 47, 456370, tzinfo=datetime.timezone.utc)),
        ),
    ]
