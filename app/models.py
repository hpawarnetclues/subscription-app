from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class UserData(models.Model):
    email = models.CharField(max_length=50)
    fullname = models.CharField(max_length=40)
    mobile = models.CharField(max_length=12, null=True)
    gender = models.CharField(null=True)
    occupation = models.CharField(null=True)
    position = models.CharField(null=True)
    dob = models.DateField(null=True)
    fathername = models.CharField(null=True)
    mothername = models.CharField(null=True)
    grandfathername = models.CharField(null=True)
    intrestofuser = ArrayField(ArrayField(models.IntegerField()), null=True)
    create_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(null=True)
    is_active = models.BooleanField(default=True)
    password = models.CharField(null=True)
    type = models.CharField(null=True, default="User")

    class Meta:
        db_table = "user_master"


class otp_master(models.Model):
    email = models.CharField(max_length=30, null=False)
    otp = models.IntegerField(null=True)
    exp_time = models.DateTimeField(null=False)
    valid = models.BooleanField(default="True")

    class Meta:
        db_table = "otp_master"


class plan_detail(models.Model):
    plan_name = models.CharField()
    plan_request = models.IntegerField(null=True)
    after_charge = models.CharField(null=True)
    price = models.IntegerField()
    is_unlimited = models.BooleanField(default=False, null=True)
    duration_id = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(null=True)
    create_at = models.DateTimeField(default=timezone.now())
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    is_deleted = models.BooleanField(default=True, null=True)

    class Meta:
        db_table = "plan_master"


class duration_master(models.Model):
    duration = models.CharField()
    is_active = models.BooleanField(default=True)
    days = models.IntegerField(null=True)

    class Meta:
        db_table = "duration_master"


class buy_plan(models.Model):
    plan_name = models.CharField()
    plan_request = models.IntegerField(null=True)
    after_charge = models.FloatField(null=True)
    price = models.IntegerField()
    is_unlimited = models.BooleanField(default=False, null=True)
    start_date = models.DateTimeField(default=timezone.now())
    end_date = models.DateTimeField(null=True)
    plan_id = models.IntegerField(null=True)
    user_id = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    continue_after = models.BooleanField(default=False)
    afterno_of_request = models.IntegerField(null=True, default=0)

    class Meta:
        db_table = "buyplan_master"


class pyment_master(models.Model):
    email = models.CharField()
    amount = models.FloatField()
    plan_id = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now())

    class Meta:
        db_table = "pyment_master"


class apicall_data(models.Model):
    user_id = models.IntegerField()
    plan_id = models.IntegerField(null=True)
    type = models.CharField()
    endpoint = models.CharField()
    requestbody = models.CharField(null=True)
    code = models.IntegerField()
    responce_data = models.CharField(null=True)
    created_at = models.DateTimeField(default=timezone.now())

    class Meta:
        db_table = "apicall_data"


class notification_master(models.Model):
    type_user = models.CharField()
    description = models.CharField()
    is_read = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now())

    class Meta:
        db_table = "notitication_master"


class userintrest(models.Model):
    user_id = models.IntegerField()
    title = models.CharField()
    created_at = models.DateTimeField(default=timezone.now())
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "userintrest"
