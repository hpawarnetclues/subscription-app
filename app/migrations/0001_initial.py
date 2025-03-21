# Generated by Django 5.0.6 on 2024-07-29 09:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=50)),
                ('fullname', models.CharField(max_length=40)),
                ('mobile', models.CharField(max_length=12, null=True)),
                ('create_by', models.DateTimeField(default=datetime.datetime(2024, 7, 29, 9, 5, 45, 122522, tzinfo=datetime.timezone.utc))),
                ('updated_by', models.DateTimeField(null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('password', models.CharField(null=True)),
            ],
            options={
                'db_table': 'user_master',
            },
        ),
    ]
