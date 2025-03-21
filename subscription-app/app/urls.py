from django.urls import path
from . import views

urlpatterns = [
    path("login", views.index, name="index_page"),
    path("register_now", views.register, name="register"),
    path("register_data", views.register_data, name="register_data"),
    path("validat_login", views.login_val, name="login_validate"),
    path("forgot_password", views.forgot_page, name="forgot_password"),
    path("send_otp", views.send_otp, name="send_otp"),
    path("varify_otp", views.varify_otp, name="varify_otp"),
    path("forgot_save", views.forgot_save, name="forgot_save"),
    path("for_temp", views.googlelogin, name="temp"),
    path("", views.dashboard, name="dashboard_page"),
    path("logout", views.logout_request, name="logout"),
    path("buy_plan", views.plan_buy, name="buy_plan"),
    path("checkuser_subscription", views.checkuser_subscription, name="checkuser_subscription"),
    path("userplan_page", views.userplan_page, name="userplan_page"),
    path("apicall_page", views.apicall_page, name="apicall_page"),
    path("aftercharge_active", views.aftercharge_active, name="aftercharge_active"),
    path("subscription-plan", views.subscription_plan, name="subscription_plan"),
    path("profile", views.profile_page, name="profile"),
    path('accounts/ 3rdparty/ login/cancelled/', views.google_logincancel,name='socialaccount_login_cancelled')
]
