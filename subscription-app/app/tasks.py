from celery import shared_task
from django.utils.timezone import datetime


import logging

logger = logging.getLogger(__name__)


@shared_task(bind=True)
def test_func(self):
    from . import models

    try:
        today_expire = models.plan_detail.objects.filter(
            is_deleted=True, end_date__lt=datetime.now().date()
        )
        if today_expire:
            for i in today_expire:
                i.is_deleted = False
                i.save()
        return "success plan expire"
    except Exception:
        return "Today no expire plan"
