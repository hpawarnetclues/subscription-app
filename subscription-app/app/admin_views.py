from django.shortcuts import render, HttpResponse, redirect
from django.template.context_processors import csrf
from django.contrib.auth.hashers import check_password
from .models import UserData, otp_master
from django.http import JsonResponse
from django.contrib import messages
from django.conf import settings
from django.utils.timezone import datetime, timedelta
import pytz
import jwt
from .decorator import is_authenticated_admin
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model
from . import models
import json
from django.core.serializers import serialize
from django.db import connection
from reportlab.lib.pagesizes import letter, landscape
from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
import math
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()
# Create your views here.


@is_authenticated_admin
def dashboard(request):
    plan_duration = models.duration_master.objects.filter(is_active=True)
    plans = models.plan_detail.objects.filter(
        is_deleted=True,
        start_date__lte=datetime.now().date(),
        end_date__gte=datetime.now().date(),
    )
    json_plan = serialize("json", plans)
    json_duration = serialize("json", plan_duration)
    context = {
        "durations": plan_duration,
        "plans": plans,
        "json_plan": json_plan,
        "json_duration": json_duration,
    }
    return render(request, "admin_pages/dashboard.html", context)


# for google login
def index(request):
    if "email" in request.session.keys():
        return redirect("dashboard_page")
    context = {}
    context.update(csrf(request))
    return render(request, "admin_pages/index.html")


# admin login validation fun.
@csrf_exempt
def login_val(request):
    email = request.POST["email"]
    password = request.POST["password"]
    # print(f' {email} and {password}')
    try:
        is_user = UserData.objects.filter(email=email).first()
        # print(is_user.type)
        if is_user and is_user.type == "Admin":
            pass_varify = check_password(password, is_user.password)
            if pass_varify:
                # print(is_user.type)
                try:
                    expire = datetime.now() + timedelta(hours=12)
                    payload = {"user_id": is_user.id, "exp": expire.timestamp()}
                    refresh = jwt.encode(
                        payload, settings.SECRET_KEY, algorithm="HS256"
                    )
                    # print(refresh)
                    request.session["token"] = refresh
                    request.session["email"] = email
                    request.session["user_type"] = "Admin"
                    return HttpResponse("success")
                except Exception as e:
                    print(e)
                    pass

            else:
                return HttpResponse("password")
        else:
            return HttpResponse("email")
    except Exception as e:
        print(e)
        return redirect("index_page")


# forgot function page fun.
def forgot_page(request):
    if "forgot_email" in request.session.keys():
        otp_have = (
            otp_master.objects.filter(email=request.session["forgot_email"], valid=True)
            .order_by("-id")
            .first()
        )
        if otp_have:
            otp_ex = (
                otp_have.exp_time - datetime.now().replace(tzinfo=pytz.utc)
            ).total_seconds()
            if otp_ex >= 90:
                return render(
                    request,
                    "admin_pages/forget_password.html",
                    context={"otp_have": "yes"},
                )
            else:
                otp_have.valid = False
                otp_have.save()
                del request.session["forgot_email"]
    return render(request, "admin_pages/forget_password.html")


# admin logout fun.
@is_authenticated_admin
def logout_request(request):
    try:

        if request.user.is_authenticated:
            user = request.user
            social_account = SocialAccount.objects.filter(user=user).first()
            if social_account:
                session_keys = list(request.session.keys())
                for key in session_keys:
                    del request.session[key]
                messages.success(request, "You are successfully logout")
                return render(request, "user_pages/index.html")
        if "user_type" in request.session.keys():
            # print('this is call')
            session_keys = list(request.session.keys())
            for key in session_keys:
                del request.session[key]
            messages.success(request, "You are successfully logout")
            return redirect("admin_index_page")
    except Exception as e:
        print(f'this is {e}')
        messages.success(request, "You are successfully logout")
        return redirect("admin_index_page")


# create duration check have already if not then add
@csrf_exempt
@is_authenticated_admin
def create_duration(request):
    title = request.POST["title"]
    day = request.POST["day"]
    try:
        # print('this is')
        is_have = models.duration_master.objects.filter(is_active=True)
        temp = [value.get("duration").lower() for value in is_have.values()]
        if title.lower() in temp:
            # print('this is')
            return JsonResponse({"error": True})
        else:
            # print('this is')
            duration = models.duration_master(duration=title, days=day)
            duration.save()
            duration_id = models.duration_master.objects.all().order_by("-id").first()
            return JsonResponse({"success": True, "id": duration_id.id})
    except Exception as e:
        print(e)
        return JsonResponse({"error": False})

    # check if user login with credentiol


# delete duration
@is_authenticated_admin
def delete_duration(request):
    id = request.GET["id"]
    try:
        plan_have = models.plan_detail.objects.filter(
            duration_id=int(id),
            start_date__lte=datetime.now().date(),
            end_date__gte=datetime.now().date(),
        )
        if plan_have:
            return HttpResponse("planhave")
        else:
            delete_duration = models.duration_master.objects.filter(id=int(id)).first()
            delete_duration.is_active = False
            try:
                delete_duration.save()
                return HttpResponse("success")
            except Exception as e:
                print(e)
                return HttpResponse("error")
    except Exception as e:
        print(e)
        return HttpResponse("error")


# duration check any duration have or not
@is_authenticated_admin
def duractioncheck(request):
    try:
        any_have = models.duration_master.objects.filter(is_active=True)
        if any_have:
            return HttpResponse("success")
        else:
            return HttpResponse("on error")
    except Exception as e:
        print(e)
        return HttpResponse("error")


# before update duration check anyplan with that duration is exist or not.
@is_authenticated_admin
def update_dur_before(request):
    id = request.GET["id"]
    try:
        plan_have = models.plan_detail.objects.filter(
            duration_id=int(id),
            start_date__lte=datetime.now().date(),
            end_date__gte=datetime.now().date(),
        )
        if plan_have:
            return JsonResponse({"success": False})
        else:
            duration = models.duration_master.objects.filter(id=int(id)).first()
            return JsonResponse(
                {
                    "success": True,
                    "id": duration.id,
                    "title": duration.duration,
                    "days": duration.days,
                }
            )
    except Exception:
        return JsonResponse({"error": True})


# duration update changes save.
@csrf_exempt
@is_authenticated_admin
def duration_save_uodate(request):
    id = request.POST["id"]
    title = request.POST["title"]
    days = request.POST["day"]
    # print(f'{id} title : {title} days : {days}')
    try:
        duration = models.duration_master.objects.filter(id=int(id)).first()
        duration.duration = title
        duration.days = days
        try:
            duration.save()
            return JsonResponse({"success": True})
        except Exception:
            return JsonResponse({"success": False})
    except Exception:
        return JsonResponse({"success": False})


# update plan/subscription before check any buyer have for that plan
@is_authenticated_admin
def updateplan_beforecheck(request):
    id = request.GET["id"]
    try:
        buyer_have = models.buy_plan.objects.filter(plan_id=int(id), is_active=True)
        if buyer_have:
            return JsonResponse({"error": True})
        plan_detail = models.plan_detail.objects.filter(
            id=int(id), end_date__gte=datetime.now().date()
        ).first()
        duration_detail = models.duration_master.objects.filter(
            id=plan_detail.duration_id, is_active=True
        ).first()
        # print(duration_detail.days)
        if plan_detail.start_date:
            if plan_detail.start_date <= datetime.now().date():
                start_date = ""
            else:
                start_date = plan_detail.start_date
        else:
            start_date = ""
        return JsonResponse(
            {
                "success": True,
                "plan_name": plan_detail.plan_name,
                "request": plan_detail.plan_request,
                "after_charge": plan_detail.after_charge,
                "price": plan_detail.price,
                "is_unlimited": plan_detail.is_unlimited,
                "duration_id": plan_detail.duration_id,
                "duration_title": duration_detail.duration,
                "end_date": plan_detail.end_date,
                "start_date": start_date,
            }
        )

    except Exception as e:
        print(e)
        return JsonResponse({"error": False})


# for go to update plan/subscription page
@is_authenticated_admin
def updateplan_page(request):
    id = request.GET["id"]
    plans = models.plan_detail.objects.filter(
        id=int(id), is_active=True, end_date__gte=datetime.now().date()
    ).first()
    plan_duration = models.duration_master.objects.filter(is_active=True)
    context = {"plans_detail": plans, "durations": plan_duration}
    if plans.start_date >= datetime.now().date():
        context["start_dateupdate"] = plans.start_date
    buyer_have = models.buy_plan.objects.filter(plan_id=int(id),is_active=True)
    currplanduration = models.duration_master.objects.filter(
        id=plans.duration_id
    ).first()
    minend_date = plans.start_date + timedelta(days=int(currplanduration.days))
    context["mindaterange"] = minend_date
    if buyer_have:
        # print('in this plan have active buyer.')
        context["havebuyerinplan"] = True
    return render(request, "admin_pages/subscription/update_plan.html", context)


# for go plan master page
@is_authenticated_admin
def plan_master(request):
    plans = models.plan_detail.objects.filter(
        is_deleted=True, end_date__gte=datetime.now().date()
    )
    # print(len(plans))
    plan_duration = models.duration_master.objects.filter(is_active=True)
    plans_detail = serialize("json", plans)
    duration_json = serialize("json", plan_duration)
    context = {
        "plans": plans,
        "json_plan": plans_detail,
        "json_duration": duration_json,
        "durations": plan_duration,
    }
    return render(request, "admin_pages/subscription/plan_master.html", context)


# create plan page redirect
@is_authenticated_admin
def createplan_page(request):
    plan_duration = models.duration_master.objects.filter(is_active=True)
    context = {"durations": plan_duration}
    return render(request, "admin_pages/subscription/creat_plan.html", context)


# duration master redirect fun
@is_authenticated_admin
def duration_master(request):
    duration = models.duration_master.objects.filter(is_active=True)
    duration_json = serialize("json", duration)
    context = {"durations": duration, "json_data": duration_json}
    return render(request, "admin_pages/duration/duration_master.html", context)


# duration update page redirect with duration details
@is_authenticated_admin
def update_duration(request):
    id = request.GET["id"]
    duration_detail = models.duration_master.objects.filter(
        id=int(id), is_active=True
    ).first()
    context = {"duration_detail": duration_detail}
    return render(request, "admin_pages/duration/duration_update.html", context)


# create duration page redirect
@is_authenticated_admin
def createduration_pagego(request):
    return render(request, "admin_pages/duration/create_duration.html")


# for subscriber user list
@is_authenticated_admin
def subscriberuser_lst(request):
    try:
        cursor = connection.cursor()

        cursor.execute("select * from subscriber_data();")
        temp_rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        data = fetch_data_as_json(temp_rows, columns)
        # print(data)
        active_subscriber = models.buy_plan.objects.all()
        # print(f'this is the plan data {active_subscriber}')
        user_data = models.UserData.objects.filter(is_active=True).exclude(
            email=request.session["email"]
        )
        temp = [value.get("plan_id") for value in active_subscriber.values()]
        plans = models.plan_detail.objects.filter(id__in=temp)
        # print(f'this is the plan data {plans}')
        context = {
            "active_plans": active_subscriber,
            "json_data": data,
            "user_data": user_data,
            "plans": plans,
        }
        return render(request, "admin_pages/subscription/subscriber_lst.html", context)
    except Exception as e:
        print(f"this is exeption of user page {e}")
        return redirect("admin_dashboard_page")


@is_authenticated_admin
def notificationshow(request):
    notifications = models.notification_master.objects.filter(
        type_user="Admin", is_read=True
    )
    jsondata = serialize("json", notifications)
    for i in notifications:
        if i.is_read:
            i.is_read = False
            i.save()

    return HttpResponse(jsondata)


@csrf_exempt
@is_authenticated_admin
def apiclls_report(request):
    # for all data related call api with plan name and user name
    cursor = connection.cursor()
    pagenumber = int(request.POST["pagenumber"])
    pagesize = int(request.POST["pagesize"])
    user_id = request.POST["user_id"]
    plan_id = request.POST["plan_id"]
    typeofreq = request.POST["type"]
    # print(f'Type is {typeofreq}')
    # print(f'Pagenumber is {pagenumber}')
    # print(f'{pagenumber} and {pagesize}')
    if user_id == "":
        user_id = None
    if plan_id == "":
        plan_id = None
    if typeofreq == "pdf":
        cursor.execute(
            "select * from apicall_data(%s,%s,NULL,NULL);",
            [
                user_id,
                plan_id,
            ],
        )
    else:
        # print('else in 10 base')
        cursor.execute(
            "select * from apicall_data(%s,%s,%s,%s);",
            [user_id, plan_id, pagenumber, pagesize],
        )
    temp_rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    data = fetch_data_as_json(temp_rows, columns)
    json_convert = json.loads(data)
    cursor.execute("select * from apicall_data(%s,%s,NULL,NULL);", [user_id, plan_id])
    totle_page = math.ceil(len(cursor.fetchall()) / pagesize)
    # print(totle_page)
    # print(len(json_convert))
    # user list
    print(f'this page {pagenumber}')
    if typeofreq == "pdf":
        try:
            return generate_pdf(temp_rows, columns)
        except Exception as e:
            print(e)

    context = {
        "api_data": json_convert,
        "Totle_pages": totle_page,
        "pagenumber": pagenumber,
    }
    return JsonResponse({"data": context})


def api_reportpage(request):
    user_lst = models.UserData.objects.filter(is_active=True).exclude(
        email=request.session["email"]
    )
    plan_lst = models.plan_detail.objects.filter(is_active=True)
    context = {"user_lst": user_lst, "plan_lst": plan_lst}
    return render(request, "admin_pages/api_reports.html", context)


def generate_pdf(query, column):
    # Create a byte buffer to hold the PDF data
    buffer = BytesIO()

    # Create a PDF document using ReportLab
    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))

    # Fetch data
    data2 = fetch_data_as_json(query, column)
    # print(f'this is data 2 {len(data2)}')
    try:
        json_data = json.loads(data2)
        # print(len(json_data))
        if len(json_data) > 0:
            # Define column headers
            columns = [
                "Sr",
                "Type",
                "URL",
                "Status Code",
                "User",
                "Data",
                "Response",
                "Created",
            ]

            # Prepare data for the table
            table_data = [columns]  # Start with headers

            # Get the sample style sheet
            styles = getSampleStyleSheet()
            # Define a paragraph style with word wrapping
            para_style = styles["BodyText"]
            para_style.wordWrap = "CJK"
            counter = 1
            for item in json_data:
                table_data.append(
                    [
                        Paragraph(str(counter) , para_style),
                        Paragraph(str(item["type"]), para_style),
                        Paragraph(str(item["endpoint"]), para_style),
                        Paragraph(str(item["code"]), para_style),
                        Paragraph(str(item["fullname"]), para_style),
                        Paragraph(str(item["requestbody"]), para_style),
                        Paragraph(str(item["responce_data"]), para_style),
                        Paragraph(str(item["created_at"]), para_style),
                    ]
                )
                counter=counter+1

            col_widths = [
                40,
                50,
                40,
                70,
                70,
                100,
                150,
                180,
            ]  # Adjust widths for each column

            # Create the table with the specified column widths
            table = Table(table_data, colWidths=col_widths)

            style = TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                    ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ]
            )

            table.setStyle(style)

            # Build the PDF
            doc.build([table])

            # Get PDF data from the buffer
            buffer.seek(0)
            pdf = buffer.getvalue()
            buffer.close()

            # Create an HTTP response with the PDF data
            response = HttpResponse(pdf, content_type="application/pdf")
            response["Content-Disposition"] = (
                'attachment; filename="apicall_report.pdf"'
            )
            return response
        else:
            return HttpResponse("nodata")
    except Exception as e:
        print(f"This pdf Exception {e}")


def fetch_data_as_json(rows, columns):
    # Convert rows to a list of dictionaries
    results = []
    for row in rows:
        row_dict = dict(zip(columns, row))
        # Convert datetime objects in the row_dict to ISO format strings
        for key, value in row_dict.items():
            if isinstance(value, datetime):
                row_dict[key] = value.isoformat()
        results.append(row_dict)

    # Convert the list of dictionaries to JSON using the custom encoder
    json_results = json.dumps(results, cls=DateTimeEncoder)

    return json_results


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        # Call the base class method for other types
        return super().default(obj)


def email_check(email):
    try:
        user = UserData.objects.get(email=email)
        if user:
            return True
    except Exception as e:
        print(e)
        return False
