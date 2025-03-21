# Generated by Django 5.0.6 on 2024-07-29 11:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='otp_master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=30)),
                ('otp', models.IntegerField(null=True)),
                ('exp_time', models.DateTimeField()),
                ('valid', models.BooleanField(default='True')),
            ],
            options={
                'db_table': 'otp_master',
            },
        ),
        migrations.AlterField(
            model_name='userdata',
            name='create_by',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 29, 11, 18, 40, 812024, tzinfo=datetime.timezone.utc)),
        ),
    ]
