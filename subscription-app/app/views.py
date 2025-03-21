from django.shortcuts import render, HttpResponse, redirect
from django.template.context_processors import csrf
from django.contrib.auth.hashers import make_password, check_password
from .models import UserData, otp_master
from django.http import JsonResponse
from django.contrib import messages
from django.core.mail import EmailMessage
from django.conf import settings
from django.utils.timezone import datetime, timedelta
import random
import pytz
import jwt
from .decorator import is_authenticated_login
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import logout
from django.contrib.auth import get_user_model
from . import models
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import json
from django.template.loader import render_to_string
from premailer import transform

User = get_user_model()


# function for send email using templates
def sendemailtemplated(context, htmlfilename):
    return render_to_string(
        template_name=f"D:\\python\\django_subscription_app\\subscription_app\\templates\\email-templates\\{htmlfilename}",
        context=context,
    )


# Create your views here.
@is_authenticated_login
def dashboard(request):
    print(request.session["email"])
    user_id = models.UserData.objects.filter(email=request.session["email"]).first()
    plan_duration = models.duration_master.objects.filter(is_active=True).order_by("id")
    duration_json = serialize("json", plan_duration)
    plan_details = checkexpire_plan(user_id.id, "get")
    # print(request.session.name)
    if plan_details:
        # print(plan_details)
        print(plan_details.id)
        plans = models.plan_detail.objects.filter(
            is_active=True, is_deleted=True, start_date__lte=datetime.now().date(), end_date__gte=datetime.now().date()
        )[:6]
    else:
        plans = models.plan_detail.objects.filter(
            is_active=True, is_deleted=True, start_date__lte=datetime.now().date(), end_date__gte=datetime.now().date()
        )[:6]

    plans_json = serialize("json", plans)
    context = {
        "durations": plan_duration,
        "plans": plans,
        "json_plan": plans_json,
        "json_duration": duration_json,
        "your_plan": plan_details,
    }
    if "user_type" in request.session.keys():
        return redirect("admin_dashboard_page")
    else:
        return render(request, "user_pages/dashboard_page.html", context)


# subescription Plan page
@is_authenticated_login
def subscription_plan(request):
    print(request.session["email"])
    user_id = models.UserData.objects.filter(email=request.session["email"]).first()
    plan_duration = models.duration_master.objects.filter(is_active=True).order_by("id")
    duration_json = serialize("json", plan_duration)
    plan_details = checkexpire_plan(user_id.id, "get")
    if plan_details:
        # print(plan_details)
        print(plan_details.id)
        plans = models.plan_detail.objects.filter(
            is_active=True, is_deleted=True, start_date__lte=datetime.now().date(), end_date__gte=datetime.now().date()
        )
    else:
        plans = models.plan_detail.objects.filter(
            is_active=True, is_deleted=True, start_date__lte=datetime.now().date(), end_date__gte=datetime.now().date()
        )

    plans_json = serialize("json", plans)
    context = {
        "durations": plan_duration,
        "plans": plans,
        "json_plan": plans_json,
        "json_duration": duration_json,
        "your_plan": plan_details,
    }
    if "user_type" in request.session.keys():
        return redirect("admin_dashboard_page")
    else:
        return render(request, "user_pages/subscription_plan.html", context)


# call for check user plan is expire or not
def checkexpire_plan(id, typeee):
    try:
        plan_details = models.buy_plan.objects.filter(user_id=id, is_active=True)
        # print('check expire xall')
        for i in plan_details:
            # print(f'{datetime.now().date()} {i.end_date.date()}')
            if datetime.now().date() > i.end_date.date():
                # print('this')
                i.is_active = False
                i.save()
    except Exception as e:
        print(e)
    if typeee == "get":
        try:
            updated_plan = models.buy_plan.objects.filter(
                user_id=id, is_active=True
            ).first()
            if updated_plan:
                return updated_plan
            else:
                return False
        except Exception:
            return False
    else:
        try:
            updated_plan = models.buy_plan.objects.filter(
                user_id=id, is_active=True
            ).first()
            if updated_plan:
                if updated_plan.is_unlimited:
                    return JsonResponse({"unlimited": True})
                if int(updated_plan.plan_request) >= 1:
                    return JsonResponse({"success": True})
                if updated_plan.continue_after:
                    return JsonResponse({"after_charge": True})
                if not updated_plan.continue_after:
                    return JsonResponse({"after_chargee": True})
            else:
                return JsonResponse({"buyplan": True})
        except Exception:
            return JsonResponse({"buyplan": True})


# for google login
def googlelogin(request):
    if request.user.is_authenticated:
        # print('auth')
        user = request.user  # Fetch current user details
        social_account = SocialAccount.objects.filter(user=user).first()
        # print('1')
        if social_account:
            google_data = social_account.extra_data  # Extract in JSON format
            email = google_data.get("email", "")
            try:
                expire = datetime.now() + timedelta(hours=12)
                payload = {"user_id": email, "exp": expire.timestamp()}
                refresh = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

                # print(refresh)
            except Exception as e:
                print(f'Exception in token creation: {e}')
                return redirect("index_page")

            try:
                is_user = UserData.objects.filter(email=email).first()
                if is_user:
                    if is_user.password:
                        print("user have and login pass")
                        messages.get_messages(request).used = False
                        messages.error(request, "this email need password login")
                        return redirect("index_page")
                    else:
                        print("user have not password")
                        request.session["token"] = refresh
                        request.session["email"] = google_data.get("email")
                        request.session["name"] = google_data.get("given_name")
                        return redirect("dashboard_page")
                request.session["token"] = refresh
                request.session["email"] = google_data.get("email")
                request.session["name"] = google_data.get("given_name")
                new_user = UserData(email=email, fullname=google_data.get("given_name"))
                new_user.save()
                return redirect("dashboard_page")
            except Exception as e:
                print(f'Exception in user handling: {e}')
                return redirect("index_page")
        else:
            return redirect("index_page")
    else:
        # print('hello')
        return redirect("index_page")


# login page fun
def index(request):
    if "user_type" in request.session.keys():
        return redirect("admin_dashboard_page")
    elif "email" in request.session.keys():
        return redirect("dashboard_page")
    else:
        context = {}
        context.update(csrf(request))
        return render(request, "user_pages/index.html")


# register page fun
def register(request):
    context = {}
    context.update(csrf(request))
    return render(request, "user_pages/register.html")


# save register form data
def register_data(request):
    name = request.GET["full_name"]
    email = request.GET["email"]
    mobile = request.GET["mobile"]
    password = make_password(request.GET["password"])
    # print(f'name : {name} email {email} mobile : {mobile} password : {password}')
    try:
        messages.get_messages(request).used = True
        have_user = UserData.objects.filter(email=email).first()
        if have_user and have_user.password:
            # messages.error(request ,'Email already exist..')
            return HttpResponse("error")
        elif have_user and have_user.password is None:
            # messages.error(request ,'Email Register for Google Login..')
            return HttpResponse("googlelogin")

        new_user = UserData(
            email=email, fullname=name, mobile=mobile, password=password
        )
        new_user.save()
        context = {"name": name, "email": email, "mobile": mobile}
        plain_message = render_to_string("email-templates/email_template.html", context)
        plain_message = transform(plain_message)
        email = EmailMessage(
            subject="Registeration Success",
            body=plain_message,
            from_email=settings.EMAIL_HOST_USER,
            to=[email],
        )
        email.content_subtype = "html"
        email.send()
        """
        plain_message = strip_tags(sendemailtemplated(context,'email_template.html'))
        sub = 'Registeration Success'
        message = plain_message
        to = settings.EMAIL_HOST_USER
        from_list = [email]
        send_mail(sub, message, to, from_list, content_subtype = 'html') #send success email to the user
        """
        messages.success(request, "User Register success")
        return HttpResponse("success")
    except Exception as e:
        print(f"this is exception occur {e}")
        return HttpResponse("internal error")


# login validate
def login_val(request):
    email = request.GET["email"]
    password = request.GET["password"]
    try:
        is_user = UserData.objects.filter(email=email).first()
        if is_user and is_user.password:
            pass_varify = check_password(password, is_user.password)
            if is_user.type == "User":
                if pass_varify and is_user.password:
                    expire = datetime.now() + timedelta(hours=12)
                    payload = {"user_id": is_user.id, "exp": expire.timestamp()}
                    refresh = jwt.encode(
                        payload, settings.SECRET_KEY, algorithm="HS256"
                    )
                    request.session["token"] = refresh
                    request.session["email"] = is_user.email
                    request.session["name"] = is_user.fullname
                    return HttpResponse("success")
                else:
                    return HttpResponse("password")
            elif is_user.type == "Admin":
                messages.error(request, "You are admin please login here..")
                return HttpResponse("admin")
        elif is_user and is_user.password is None:
            return HttpResponse("Googlelogin")
        else:
            return HttpResponse("email")
    except Exception as e:
        print(e)
        return redirect("index_page")


# forgot page fun
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
                    "user_pages/forget_password.html",
                    context={"otp_have": "yes"},
                )
            else:
                otp_have.valid = False
                otp_have.save()
                del request.session["forgot_email"]
    return render(request, "user_pages/forget_password.html")


# sendotp function
def send_otp(request):  # using email send otp for foget password
    email = ""
    if "forgot_email" in request.session.keys():
        email = request.session["forgot_email"]
    else:
        email = request.GET["email"]
    # print(f'hello {email}')
    try:
        if email_check(email):
            check_gooogle = models.UserData.objects.filter(email=email).first()
            if check_gooogle.password:
                otherotps = otp_master.objects.filter(email=email, valid=True)
                if otherotps:
                    for i in otherotps:
                        i.valid = False
                        i.save()
                otp = random.randint(100000, 999999)
                # print(otp)
                # global curr_time
                curr_time = datetime.now() + timedelta(seconds=240)
                # print(curr_time)
                otp_save = otp_master(otp=otp, email=email, exp_time=curr_time)
                otp_save.save()
                request.session["forgot_email"] = email
                context = {"verification_code": otp}
                plain_message = render_to_string(
                    "email-templates/emailforgotpass.html", context
                )
                plain_message = transform(plain_message)
                email = EmailMessage(
                    subject="Forgot Password Varification Code",
                    body=plain_message,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[email],
                )
                email.content_subtype = "html"
                email.send()
                # temp = send_mail('Forgot password', f'From Netclues Otp Is {otp}', settings.EMAIL_HOST_USER, [email])
                return HttpResponse("success")
            else:
                return HttpResponse("Googlelogin")
        else:
            return HttpResponse("email")
    except Exception as e:
        print(e)
        return HttpResponse("email")


# varify otp is match entered by user
def varify_otp(request):  # this is for varify otp same or not
    temp_otp = request.GET["otp"]
    try:
        if "forgot_email" in request.session.keys():
            email = request.session["forgot_email"]
    except Exception:
        email = request.GET["email"]

    otps = otp_master.objects.filter(email=email, valid="True").order_by("-id").last()
    otp_ex = (otps.exp_time - datetime.now().replace(tzinfo=pytz.utc)).total_seconds()
    # print(otp_ex)
    # print(datetime.now())
    if otp_ex >= 0:
        if int(temp_otp) == int(otps.otp):
            otps.valid = "False"
            otps.save()
            return HttpResponse("match")
        else:
            return HttpResponse("not match")
    else:
        otps.valid = "False"
        otps.save()
        return HttpResponse("expire")


# when user successfully forgot password then password save
def forgot_save(request):
    try:
        email = request.GET["email"]
        password = request.GET["password"]
        update_pass = UserData.objects.get(email=email)
        hashed_pass = make_password(password)
        update_pass.password = hashed_pass
        update_pass.save()
        messages.get_messages(request).used = True
        # messages.success(request,'Password is forget success.')
        return HttpResponse("done")
    except Exception as e:
        print(f"this is password forget exception {e}")
        return HttpResponse("error")


# logut user
@is_authenticated_login
def logout_request(request):
    if request.user.is_authenticated:
        session_keys = list(request.session.keys())
        for key in session_keys:
            del request.session[key]
        messages.success(request, "You are successfully logout")
        return redirect("index_page")
    if "email" in request.session.keys():
        session_keys = list(request.session.keys())
        is_admin_flag = 0
        for key in session_keys:
            if key == "user_type":
                if request.session[key] == "Admin":
                    is_admin_flag = 1
            del request.session[key]
        if is_admin_flag == 0:
            messages.success(request, "You are successfully logout")
            return redirect("index_page")
        else:
            messages.success(request, "You are successfully logout")
            return redirect("admin_index_page")

    # check if user login with credentiol


@is_authenticated_login
def plan_buy(request):
    duration = request.POST["duration"]
    plan_name = request.POST["plan_name"]
    plan_id = request.POST["plan_id"]
    context = {"duration": duration, "plan_name": plan_name, "plan_id": plan_id}
    return render(request, "user_pages/planbuy_page.html", context)


# check user have active subescription/plan
@csrf_exempt
@is_authenticated_login
def checkuser_subscription(request):
    user_id = models.UserData.objects.filter(email=request.session["email"]).first()
    if request.method == "POST":
        responce = checkexpire_plan(user_id.id, "post")
        convert = json.loads(responce.content)
        if "buyplan" in convert.keys():
            print("true")
            plan_id = request.POST["id"]
            plan_detail = models.plan_detail.objects.filter(id=plan_id).first()
            duration = models.duration_master.objects.filter(
                id=plan_detail.duration_id
            ).first()
            # end_date = datetime.strptime(plan_detail.end_date, '%Y-%m-%d').date()
            current_date = datetime.today().date()
            delta = plan_detail.end_date - current_date
            days_difference = delta.days
            print(days_difference)
            if days_difference >= duration.days:
                return JsonResponse({"buyplan": True})
            else:
                return JsonResponse({"noofdayleft": days_difference})
        print(convert)
        return checkexpire_plan(user_id.id, "post")
    else:
        plan_details = checkexpire_plan(user_id.id, "get")
        print(f"call get {plan_details}")
        if plan_details:
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False})


# user plan page function
@is_authenticated_login
def userplan_page(request):
    user_id = models.UserData.objects.filter(email=request.session["email"]).first()
    plan_duration = models.duration_master.objects.filter(is_active=True).order_by("id")
    plan_details = models.buy_plan.objects.filter(user_id=user_id.id).order_by('-is_active')
    json_data = serialize("json", plan_details)
    context = {
        "durations": plan_duration,
        "your_plan": plan_details,
        "json_data": json_data,
    }
    return render(request, "user_pages/user_plan.html", context)


# when user no.of request is empty and try to access with extra charge per request
@is_authenticated_login
def aftercharge_active(request):
    try:
        user_id = models.UserData.objects.filter(email=request.session["email"]).first()
        # plan_duration = models.duration_master.objects.filter(is_active=True).order_by("id")
        plan_details = models.buy_plan.objects.filter(
            user_id=user_id.id, is_active=True
        ).first()
        plan_details.continue_after = True
        plan_details.save()
        return JsonResponse({"success": True})
    except Exception as e:
        return JsonResponse({"error": e})


@csrf_exempt
@is_authenticated_login
def profile_page(request):
    if request.method == "GET":
        user_data = models.UserData.objects.filter(
            email=request.session["email"]
        ).first()
        # interest = models.userintrest.objects.filter(user_id=user_data.id)
        # listofintrest = [value.get("title") for value in interest.values()]
        print(f"postion ins {user_data.position}")
        if user_data.dob:
            date = datetime.strftime(user_data.dob, "%Y-%m-%d")
            print(date)
        else:
            date = ""
        context = {
            "name": user_data.fullname,
            "email": user_data.email,
            "mobile": user_data.mobile,
            "gender": user_data.gender,
            "occupation": user_data.occupation,
            "position": user_data.position,
            "dob": date,
            "fathername": user_data.fathername,
            "mothername": user_data.mothername,
            "grandfathername": user_data.grandfathername,
            "intrestofuser": user_data.intrestofuser,
        }
        return render(request, "user_pages/userprofile.html", context)
    elif request.method == "POST":
        try:
            email = request.session["email"]
            name = request.POST["name"]
            dob = request.POST["dob"]
            mobile = request.POST["mobile"]
            gender = request.POST["gender"]
            fathername = request.POST["fathername"]
            mothername = request.POST["mothername"]
            gradfather = request.POST["grandfather"]
            occupation = request.POST["occupation"]
            interestofuser = request.POST.getlist("useofapp[]")
            position = request.POST["position"]
            print(f"usr intrest is {interestofuser}")
            print(dob)
            if not dob:
                dob = None
            user = models.UserData.objects.filter(email=email).first()
            user.fullname = name
            user.mobile = mobile
            user.gender = gender
            user.dob = dob
            user.fathername = fathername
            user.mothername = mothername
            user.grandfathername = gradfather
            user.occupation = occupation
            user.position = position
            user.intrestofuser = interestofuser
            user.save()
            context = {
                "name": name,
                "fathername": fathername,
                "mothername": mothername,
                "grandfather": gradfather,
                "mobile": mobile,
                "email": email,
                "dob": dob,
                "gender": gender,
                "occupation": occupation,
                "position": position,
            }
            plain_message = render_to_string(
                "email-templates/updateprofile_email.html", context
            )
            plain_message = transform(plain_message)
            email = EmailMessage(
                subject="Update Profile Success",
                body=plain_message,
                from_email=settings.EMAIL_HOST_USER,
                to=[email],
            )
            email.content_subtype = "html"
            email.send()
            return HttpResponse("success")
        except Exception as e:
            print(f"user Profile Error {e}")
            return HttpResponse("error")


# apicall page function call
@is_authenticated_login
def apicall_page(request):
    return render(request, "user_pages/apicall_page.html")


def email_check(email):
    try:
        user = UserData.objects.get(email=email)
        print(user)
        if user:
            return True
    except Exception:
        return False
def google_logincancel(request):
    return redirect('index_page')