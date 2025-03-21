from django.urls import path, include
from . import admin_views as views

urlpatterns = [
    path("login", views.index, name="admin_index_page"),
    path("admin_validat_login", views.login_val, name="admin_login_validate"),
    path("forgot-password", views.forgot_page, name="admin_forgot_password"),
    path("", views.dashboard, name="admin_dashboard_page"),
    path("logout", views.logout_request, name="admin_logout"),  # admin logout
    path(
        "create_duration", views.create_duration, name="create_durationsave"
    ),  # durations save
    path(
        "delete_duration", views.delete_duration, name="delete_duration"
    ),  # delete duration
    path(
        "check_duration", views.duractioncheck, name="check_duration"
    ),  # check duration is have or not
    path(
        "check_duration_before", views.update_dur_before, name="check_duration_before"
    ),
    path(
        "duration_update_save", views.duration_save_uodate, name="duration_update_save"
    ),  # updated duration save
    path(
        "updateplan_beforecheck",
        views.updateplan_beforecheck,
        name="updateplan_beforecheck",
    ),  # plan update before check have buyer
    path(
        "master/subscription", views.plan_master, name="plan_master"
    ),  # go to subscritpiton master
    path(
        "master/subscription/update", views.updateplan_page, name="update_planpage"
    ),  # update subescription master page
    path(
        "master/subscription/create", views.createplan_page, name="createplan_page"
    ),  # create subscription page go
    path(
        "master/duration", views.duration_master, name="duration_master"
    ),  # duration master page
    path(
        "master/duration/update", views.update_duration, name="duration_update"
    ),  # duration update page
    path(
        "master/duration/create", views.createduration_pagego, name="create_duration"
    ),  # create duration page
    path("subscriber/active", views.subscriberuser_lst, name="active_subscriber"),
    path("subscriber/report", views.apiclls_report, name="generatereport"),
    path("subscriber/api_reportpage", views.api_reportpage, name="api_reportpage"),
    path("noticationshow", views.notificationshow, name="notificationshow"),
]
