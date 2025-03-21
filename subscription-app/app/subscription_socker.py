import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . import models
from asgiref.sync import sync_to_async
from django.utils.timezone import datetime, timedelta


class Subscription_soket(AsyncWebsocketConsumer):
    # call when soket is connect using url
    async def connect(self):
        self.roomGroupName = "general"
        print(self.roomGroupName)
        await self.channel_layer.group_add(self.roomGroupName, self.channel_name)
        await self.accept()

    # when the soket or channel is disconnect
    async def disconnect(self, close_code):
        print(f"desiconnect  : {self.channel_name}")
        await self.channel_layer.group_discard(self.roomGroupName, self.channel_name)

    # when some one try to chat with channl,soket
    async def receive(self, text_data):
        print("receive")
        try:
            text_data_json = json.loads(text_data)
            if text_data_json["type"] == "add_plan":
                # print(text_data_json['end_date'])
                duration_type = await sync_to_async(
                    models.duration_master.objects.filter(
                        id=int(text_data_json["duration_id"])
                    ).first
                )()
                plan_eixst = await sync_to_async(
                    models.plan_detail.objects.filter(
                        plan_name=text_data_json["name"], is_active=True, end_date__gt=datetime.today().date()
                    ).first
                )()
                if plan_eixst:
                    await self.channel_layer.group_send(
                        self.roomGroupName, {"type": "AddPlan", "status": "error"}
                    )
                else:
                    if text_data_json["plan_type"] == "unlimited":
                        new_plan = models.plan_detail(
                            plan_name=text_data_json["name"],
                            price=text_data_json["price"],
                            is_unlimited=True,
                            duration_id=text_data_json["duration_id"],
                            start_date=text_data_json["start_date"],
                            end_date=text_data_json["end_date"],
                        )
                        await sync_to_async(new_plan.save)()
                        # temp = await sync_to_async(last_plan_id)()
                        temp = await sync_to_async(
                            models.plan_detail.objects.all().order_by("-id").first
                        )()
                        await self.channel_layer.group_send(
                            self.roomGroupName,
                            {
                                "type": "AddPlan",
                                "duration": duration_type.duration,
                                "duration_id": duration_type.id,
                                "requests": "Unlimited",
                                "price": text_data_json["price"],
                                "plan_name": text_data_json["name"],
                                "typee": "unlimited",
                                "plan_id": temp.id,
                                "start_date": text_data_json["start_date"],
                                "end_date": text_data_json["end_date"],
                                "status": "success",
                            },
                        )
                    else:
                        new_plan = models.plan_detail(
                            plan_name=text_data_json["name"],
                            price=text_data_json["price"],
                            plan_request=text_data_json["requests"],
                            after_charge=text_data_json["after_charge"],
                            duration_id=text_data_json["duration_id"],
                            start_date=text_data_json["start_date"],
                            end_date=text_data_json["end_date"],
                        )
                        await sync_to_async(new_plan.save)()
                        temp = await sync_to_async(
                            models.plan_detail.objects.all().order_by("-id").first
                        )()
                        await self.channel_layer.group_send(
                            self.roomGroupName,
                            {
                                "type": "AddPlan",
                                "duration": duration_type.duration,
                                "requests": text_data_json["requests"],
                                "price": text_data_json["price"],
                                "plan_name": text_data_json["name"],
                                "after_cost": text_data_json["after_charge"],
                                "typee": "limited",
                                "duration_id": duration_type.id,
                                "plan_id": temp.id,
                                "start_date": text_data_json["start_date"],
                                "end_date": text_data_json["end_date"],
                                "status": "success",
                            },
                        )
            elif text_data_json["type"] == "buy_plan":
                session = self.scope["session"]
                amount = await self.check_lastbuyplan(session["email"])
                # print('buy plan')
                # temp_dur = {'Day':0,'Weekly':6,'font-night':14,'monthly':29,'Yearly':364}
                id = text_data_json["id"]
                duration = text_data_json["duration"]
                for_day = await sync_to_async(
                    models.duration_master.objects.filter(duration=duration).first
                )()
                # print(duration)
                user_id = await sync_to_async(
                    models.UserData.objects.filter(email=session["email"]).first
                )()
                plan_detail = await sync_to_async(
                    models.plan_detail.objects.filter(id=id).first
                )()
                amount += plan_detail.price
                print(f"paybble amount : {amount}")
                current_date = datetime.today().date()
                delta = plan_detail.end_date - current_date
                days_difference = delta.days
                # print(days_difference)
                if days_difference >= for_day.days:
                    exp_date = datetime.now() + timedelta(days=int(for_day.days - 1))
                else:
                    exp_date = datetime.now() + timedelta(days=int(days_difference))
                    notification = models.notification_master(
                        type_user="Admin",
                        description=f"plan {plan_detail.plan_name} is expire soon but still {user_id.fullname} buy it if you want to extend this plan?.",
                    )
                    await sync_to_async(notification.save)()
                # save payment

                # save in buyplan table
                buy_new = models.buy_plan(
                    plan_name=plan_detail.plan_name,
                    plan_request=plan_detail.plan_request,
                    after_charge=plan_detail.after_charge,
                    price=plan_detail.price,
                    is_unlimited=plan_detail.is_unlimited,
                    end_date=exp_date,
                    plan_id=plan_detail.id,
                    user_id=user_id.id,
                )
                await sync_to_async(buy_new.save)()

                # save pyment detail
                new_pyment = models.pyment_master(
                    email=session["email"], amount=amount, plan_id=plan_detail.id
                )
                await sync_to_async(new_pyment.save)()

                # print(exp_date.date())
                # print(temp_dur[duration])
                # print(plan_detail.is_unlimited)
                if plan_detail.is_unlimited:
                    # print('call unlimited')
                    await self.channel_layer.group_send(
                        self.roomGroupName,
                        {
                            "type": "BuyPlan",
                            "plan_name": plan_detail.plan_name,
                            "end_date": exp_date.date(),
                            "typee": "unlimited",
                            "plan_id": text_data_json["id"],
                        },
                    )
                else:
                    await self.channel_layer.group_send(
                        self.roomGroupName,
                        {
                            "type": "BuyPlan",
                            "plan_name": plan_detail.plan_name,
                            "plan_request": plan_detail.plan_request,
                            "after_charge": plan_detail.after_charge,
                            "end_date": exp_date.date(),
                            "typee": "limited",
                            "plan_id": text_data_json["id"],
                        },
                    )

            elif text_data_json["type"] == "delete_plan":
                id = text_data_json["id"]
                plan_detail = await sync_to_async(
                    models.plan_detail.objects.filter(id=int(id)).first
                )()
                if plan_detail:
                    plan_detail.is_deleted = False
                    plan_detail.is_active = False
                    await sync_to_async(plan_detail.save)()
                    await self.channel_layer.group_send(
                        self.roomGroupName,
                        {"type": "DeletePlan", "id": id, "typee": "success"},
                    )
                else:
                    await self.channel_layer.group_send(
                        {self.roomGroupName, {"type": "DeletePlan", "typee": "error"}}
                    )
            elif text_data_json["type"] == "Update_plan":
                plan_id = text_data_json["id"]
                plan_detail = await sync_to_async(
                    models.plan_detail.objects.filter(id=int(plan_id)).first
                )()
                if plan_detail:
                    # print(f'this is the buyer check {text_data_json['havebuyer']}')
                    if text_data_json["havebuyer"] == "yes":
                        end_date = text_data_json["end_date"]
                        plan_detail.end_date = end_date
                        await sync_to_async(plan_detail.save)()
                        await updateuser_expiredate(int(plan_id))
                        await self.channel_layer.group_send(
                            self.roomGroupName,
                            {
                                "type": "UpdatePlan",
                                "typee": "success",
                            },
                        )
                    else:
                        check_plan = await sync_to_async(
                            models.plan_detail.objects.filter(
                                plan_name__icontains=text_data_json["name"]
                            )
                            .exclude(id=int(plan_id))
                            .first
                        )()
                        if check_plan:
                            await self.channel_layer.group_send(
                                self.roomGroupName,
                                {
                                    "type": "UpdatePlan",
                                    "typee": "planalreadyhave",
                                },
                            )

                        else:

                            # print(text_data_json['is_unlimited'])
                            if text_data_json["is_unlimited"]:
                                # print('unlimited')
                                plan_detail.plan_name = text_data_json["name"]
                                plan_detail.is_unlimited = True
                                plan_detail.after_charge = None
                                plan_detail.plan_request = None
                                plan_detail.price = text_data_json["price"]
                                plan_detail.start_date = text_data_json["start_date"]
                                plan_detail.end_date = text_data_json["end_date"]
                                plan_detail.duration_id = text_data_json["duration_id"]
                            else:
                                # print('limited')
                                plan_detail.plan_name = text_data_json["name"]
                                plan_detail.is_unlimited = False
                                plan_detail.after_charge = text_data_json[
                                    "after_charge"
                                ]
                                plan_detail.plan_request = text_data_json["requests"]
                                plan_detail.price = text_data_json["price"]
                                plan_detail.start_date = text_data_json["start_date"]
                                plan_detail.end_date = text_data_json["end_date"]
                                plan_detail.duration_id = text_data_json["duration_id"]

                            # print('this')
                            await sync_to_async(plan_detail.save)()
                            await self.channel_layer.group_send(
                                self.roomGroupName,
                                {
                                    "type": "UpdatePlan",
                                    "typee": "success",
                                },
                            )
                else:
                    await self.channel_layer.group_send(
                        self.roomGroupName, {"type": "UpdatePlan", "typee": "error"}
                    )
        except Exception as e:
            print(f"this is exception call {e}")

    # when try to receive some notification or message
    async def sendMessage(self, event):
        await self.send(text_data=json.dumps({"message": "temp"}))

    async def AddPlan(self, event):
        if event["status"] == "success":
            print('plan add sucess')
            type = event["typee"]
            if datetime.strptime(event["start_date"], "%Y-%m-%d").date() <= datetime.now().date():
                if type == "unlimited":
                    await self.send(
                        text_data=json.dumps(
                            {
                                "plan_id": event["plan_id"],
                                "plan_name": event["plan_name"],
                                "price": event["price"],
                                "request": "Unlimited",
                                "duration": event["duration"],
                                "type": "plan_add",
                                "plan_type": "unlimited",
                                "duration_id": event["duration_id"],
                                "start_date": event["start_date"],
                                "end_date": event["end_date"],
                                "status": "success",
                            }
                        )
                    )
                else:
                    await self.send(
                        text_data=json.dumps(
                            {
                                "plan_id": event["plan_id"],
                                "plan_name": event["plan_name"],
                                "price": event["price"],
                                "request": event["requests"],
                                "after_cost": event["after_cost"],
                                "duration": event["duration"],
                                "type": "plan_add",
                                "plan_type": "limited",
                                "duration_id": event["duration_id"],
                                "start_date": event["start_date"],
                                "end_date": event["end_date"],
                                "status": "success",
                            }
                        )
                    )
            else:
                await self.send(
                    text_data=json.dumps({"status": "plan_start_date_future", "type": "plan_add"})
                )
        else:
            print('call it also')
            await self.send(
                text_data=json.dumps({"status": "error", "type": "plan_add"})
            )

    async def BuyPlan(self, event):
        type = event["typee"]
        if type == "unlimited":
            await self.send(
                text_data=json.dumps(
                    {
                        "plan_id": event["plan_id"],
                        "plan_name": event["plan_name"],
                        "request": "Unlimited",
                        "enddate": str(event["end_date"]),
                        "type": "buy_plan",
                        "plan_type": "unlimited",
                    }
                )
            )
        else:
            await self.send(
                text_data=json.dumps(
                    {
                        "plan_id": event["plan_id"],
                        "plan_name": event["plan_name"],
                        "request": event["plan_request"],
                        "after_cost": event["after_charge"],
                        "enddate": str(event["end_date"]),
                        "type": "buy_plan",
                        "plan_type": "limited",
                    }
                )
            )

    async def DeletePlan(self, event):
        if event["typee"] == "success":
            await self.send(
                text_data=json.dumps(
                    {
                        "plan_id": event["id"],
                        "type": "deleteplan",
                        "sub-type": "success",
                    }
                )
            )
        else:
            await self.send(text_data=({"type": "deleteplan", "sub-type": "error"}))

    async def UpdatePlan(self, event):
        # print('send')
        if event["typee"] == "success":
            await self.send(
                text_data=json.dumps({"type": "updateplan", "sub-type": "success"})
            )
        elif event["typee"] == "planalreadyhave":
            await self.send(
                text_data=json.dumps(
                    {"type": "updateplan", "sub-type": "planalreadyhave"}
                )
            )
        else:
            await self.send(
                text_data=json.dumps({"type": "updateplan", "sub-type": "error"})
            )

    async def last_plan_id():
        return await sync_to_async(
            models.plan_detail.objects.all().order_by("-id").first
        )()

    async def check_lastbuyplan(self, email):
        # print('call function for extra charge')
        user_id = await sync_to_async(
            models.UserData.objects.filter(email=email).first
        )()
        existing_plan = await sync_to_async(
            models.buy_plan.objects.filter(user_id=user_id.id, is_active=True).first
        )()
        if existing_plan:
            if not existing_plan.continue_after:
                existing_plan.is_active = False
                await sync_to_async(existing_plan.save)()
                return 0
            else:
                amount = (
                    int(existing_plan.afterno_of_request) * existing_plan.after_charge
                )
                existing_plan.is_active = False
                await sync_to_async(existing_plan.save)()
                return float(amount)
        else:
            return 0


async def updateuser_expiredate(id):
    plan_detail = await sync_to_async(
        models.plan_detail.objects.filter(id=id, is_active=True).first
    )()
    duration = await sync_to_async(
        models.duration_master.objects.filter(id=plan_detail.duration_id).first
    )()
    buyer_lst = await sync_to_async(
        lambda: list(models.buy_plan.objects.filter(plan_id=id, is_active=True))
    )()
    current_date = datetime.today().date()
    delta = plan_detail.end_date - current_date
    days_difference = delta.days
    # print(f'this is th plan day diffrece {days_difference}')
    for i in buyer_lst:
        userdatediff = i.end_date - i.start_date
        userdatediffindays = userdatediff.days
        # print(f'User buy plan difference in days {userdatediffindays}')
        if (userdatediffindays + 1) < duration.days:
            userremaildelte = current_date - i.start_date.date()
            remaindays = userremaildelte.days
            # print(f'this is user remaining days {remaindays}')
            if days_difference <= duration.days:
                exp_date = i.start_date + timedelta(days=int(days_difference))
            else:
                dayexted = duration.days - (userdatediffindays - 1)
                # print(f'this is the extended dates {dayexted}')
                exp_date = i.end_date + timedelta(days=int(dayexted))
            i.end_date = exp_date
            await sync_to_async(i.save)()
            # print('user aftected')
        else:
            print("user not afcted")
        # print(f'user plan {userdatediffindays}')
