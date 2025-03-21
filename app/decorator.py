from django.shortcuts import redirect
from django.contrib import messages
import jwt
from django.conf import settings


def is_authenticated_login(view_func):
    def wrapper_func(request, *args, **kwargs):
        try:
            if "token" in request.session.keys():
                try:
                    token = jwt.decode(
                        request.session["token"],
                        settings.SECRET_KEY,
                        algorithms=["HS256"],
                    )
                    # Token is valid, proceed with the original view
                    return view_func(request, *args, **kwargs)
                except Exception as e:
                    print(f"Invalid token: {e}")
                    messages.error(request, "Your token is invalid. Please re-login.")
                    session_keys = list(request.session.keys())
                    for key in session_keys:
                        del request.session[key]
                    return redirect("index_page")
            else:
                session_keys = list(request.session.keys())
                for key in session_keys:
                    del request.session[key]
                messages.error(request, "You are not logged in. Please login.")
                return redirect("index_page")
        except Exception as e:
            session_keys = list(request.session.keys())
            for key in session_keys:
                del request.session[key]
            print(f"Unexpected error: {e}")
            return redirect("index_page")

    return wrapper_func


# admin authentication login


def is_authenticated_admin(view_func):
    def wrapper_func(request, *args, **kwargs):
        if "token" in request.session.keys():
            try:
                token = jwt.decode(
                    request.session["token"], settings.SECRET_KEY, algorithms=["HS256"]
                )
                print(token["user_id"])
                print("token")
                return view_func(request, *args, **kwargs)

            except Exception as e:
                session_keys = list(request.session.keys())
                for key in session_keys:
                    del request.session[key]
                print(f"except this {e}")
                messages.error(request, "Your token is expired please re-login")
                return redirect("admin_index_page")

        else:
            print("else")
            if "email" in request.session.keys():
                del request.session["email"]

            # messages.error(request, 'Your token is expired please re-login')
            return redirect("admin_index_page")

    return wrapper_func
