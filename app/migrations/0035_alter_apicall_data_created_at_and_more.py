# Generated by Django 5.0.6 on 2024-09-19 06:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0034_alter_apicall_data_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apicall_data',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='afterno_of_request',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='notification_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='pyment_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userintrest',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 19, 6, 43, 45, 281720, tzinfo=datetime.timezone.utc)),
        ),
    ]
