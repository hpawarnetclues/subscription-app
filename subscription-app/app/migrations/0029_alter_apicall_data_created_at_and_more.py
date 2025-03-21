# Generated by Django 5.0.6 on 2024-09-12 07:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0028_notification_master_alter_apicall_data_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apicall_data',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 196741, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='buy_plan',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 196741, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='notification_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 196741, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='plan_detail',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 194711, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='pyment_master',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 196741, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 12, 7, 24, 4, 194711, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterModelTable(
            name='notification_master',
            table='notitication_master',
        ),
    ]
