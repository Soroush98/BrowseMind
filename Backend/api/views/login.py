"""
Login view - thin HTTP layer.
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..schemas.auth import LoginRequest
from ..services.auth_service import (
    InvalidCredentialsError,
    EmailNotConfirmedError,
)
from ..services.token_service import TokenService
from ..dependencies import get_auth_service


@csrf_exempt
def login_view(request):
    """Handle user login requests."""
    if request.method != "POST":
        return JsonResponse(
            {"success": False, "message": "Only POST allowed"}, status=405
        )

    try:
        data = json.loads(request.body)
        login_request = LoginRequest.from_dict(data)

        auth_service = get_auth_service()
        token = auth_service.login(login_request)

        response = JsonResponse(
            {"success": True, "message": "Login successful", "token": token}
        )
        response.set_cookie(
            key="token",
            value=token,
            httponly=True,
            secure=True,
            samesite="None",
            max_age=TokenService.get_token_expiry_seconds(),
        )
        return response

    except ValueError as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)

    except InvalidCredentialsError:
        return JsonResponse(
            {"success": False, "message": "Invalid credentials"}, status=401
        )

    except EmailNotConfirmedError as e:
        return JsonResponse(
            {
                "success": False,
                "message": str(e),
                "redirect": "check-email",
                "email": e.email,
            },
            status=403,
        )

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)