
from django import template
from app import models
from django.utils.timezone import datetime

register = template.Library()

@register.filter
def get_fullname_by_pk(pk):
    print('call it')
    full_name = models.UserData.objects.filter(id=pk,is_active=True).first()
    if full_name:
        return full_name.fullname
    return None

@register.filter
def convert_date(date):
    if isinstance(date, str):
        cleaned_date_str = date.replace('.', '')
        input_format = "%b %d, %Y, %I:%M %p"
        
        try:
            # Convert string to datetime object
            date_obj = datetime.strptime(cleaned_date_str, input_format)
            return date_obj.strftime("%Y-%m-%d")
        except ValueError:
            return "Invalid date format"
    return "Invalid input type"
