# Generated by Django 5.0.6 on 2024-09-11 10:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_rename_body_apicall_data_requestbody_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apicall_data',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 11, 10, 59, 18, 256792, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 11, 10, 59, 18, 256792, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 11, 10, 59, 18, 256792, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='pyment_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 11, 10, 59, 18, 256792, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 11, 10, 59, 18, 256792, tzinfo=datetime.timezone.utc)),
        ),
    ]
