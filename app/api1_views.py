from django.http import JsonResponse
from . import models
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status


@csrf_exempt
def temp1(request):
    if request.method == "POST":
        if "bodydata" in request.POST:
            body_data = json.loads(request.POST["bodydata"])
            print(body_data)
            try:
                return get_request(
                    request, "Post", body_data, "Hello " + body_data["name"]
                )
            except Exception:
                return JsonResponse(
                    {"error": "Enter Valid JSON data valid Key.."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return get_request(request, "Post")

    else:
        if "bodydata" in request.GET:
            body_data = json.loads(request.GET["bodydata"])
            print(body_data)
            try:
                return get_request(
                    request, "Get", body_data, "Hello " + body_data["name"]
                )
            except Exception as e:
                print(f"this is key error {e}")
                return JsonResponse(
                    {"error": "Enter Valid JSON data valid Key.."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return get_request(request, "Get")


def get_request(request, typee, orgdata="", data=""):
    # print('get function call')
    # print(f'data is : {data}')
    try:
        # print('get function call')
        user_id = models.UserData.objects.filter(email=request.session["email"]).first()
        plan_details = models.buy_plan.objects.filter(
            user_id=user_id.id, is_active=True
        ).first()
        if plan_details:
            print("get function call")
            if plan_details.is_unlimited:
                print("get function call unlimited")
                try:
                    save_all(
                        typee,
                        "/api1",
                        200,
                        user_id.id,
                        plan_details.plan_id,
                        f"success :Response of {typee} Request {data}",
                        orgdata,
                    )
                    # save_all(typee,'/api1',200,user_id.id,data,plan_details.id,f"success:Responce of {typee} Request {data}",)
                    return JsonResponse(
                        {"success": f"Response of {typee} Request {data}"}
                    )
                except Exception as e:
                    return e
            else:
                print("get function call limited")
                if int(plan_details.plan_request) >= 1:
                    print("get function call request")
                    new_request = int(plan_details.plan_request) - 1
                    plan_details.plan_request = new_request
                    try:
                        plan_details.save()
                        save_all(
                            typee,
                            "/api1",
                            200,
                            user_id.id,
                            plan_details.plan_id,
                            f"success :Response of {typee} Request {data}",
                            orgdata,
                        )
                        return JsonResponse(
                            {"success": f"Response of {typee} Request {data}"},
                            status=status.HTTP_200_OK,
                        )
                    except Exception as e:
                        print(f"Exception planrequest {e}")
                        return e

                elif plan_details.continue_after:
                    print("get function call after charge")
                    new_request = int(plan_details.afterno_of_request) + 1
                    plan_details.afterno_of_request = new_request
                    try:
                        plan_details.save()
                        save_all(
                            typee,
                            "/api1",
                            200,
                            user_id.id,
                            plan_details.plan_id,
                            f"success:Response of {typee} Request {data}",
                            orgdata,
                        )
                        return JsonResponse(
                            {"success": f"Response of {typee} Request {data}"}
                        )
                    except Exception as e:
                        print(f"Exception afetr {e}")
                        print(e[0][0]["code"])
                        return e

                else:
                    return JsonResponse(
                        {
                            "accessend": "You have no of access is used if you continue then extra charge applied"
                        }
                    )
        else:
            return JsonResponse(
                {"error": "Your Plan is expire plase buy new plan"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Exception as e:
        print(f"Exceprion : {e}")
        return e


def save_all(
    type, endpoint, responcecode, userid, planid, responcedata, requestbody=""
):
    if requestbody:
        new_data = models.apicall_data(
            type=type,
            endpoint=endpoint,
            user_id=userid,
            code=responcecode,
            plan_id=planid,
            responce_data=responcedata,
            requestbody=requestbody,
        )
    else:
        new_data = models.apicall_data(
            type=type,
            endpoint=endpoint,
            code=responcecode,
            user_id=userid,
            responce_data=responcedata,
            plan_id=planid,
        )
    new_data.save()


def test(request):
    return JsonResponse({"success": "click"}, status=status.HTTP_200_OK)
