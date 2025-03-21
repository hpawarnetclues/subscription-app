from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from app import tasks

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'subscription_app.settings')

app = Celery('subscription_app',)


app.conf.enable_utc = False

app.conf.update(timezone = 'Asia/Kolkata')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'my-task': {
        'task': 'app.tasks.test_func',
        'schedule': crontab(hour=10,minute=15),
    }
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


    #celery -A subscription_app worker --loglevel=INFO --concurrency 1 -P solo
    #celery -A subscription_app beat --loglevel=info
    #redis-cli -p 6380 flushall
