"""
Email confirmation views - thin HTTP layer.
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..schemas.auth import RegisterRequest, ConfirmEmailRequest, ResendConfirmationRequest
from ..services.auth_service import (
    UserAlreadyExistsError,
    PendingConfirmationError,
    InvalidConfirmationError,
    ConfirmationExpiredError,
    NoPendingRegistrationError,
)
from ..dependencies import get_auth_service


@csrf_exempt
def register_view(request):
    """Handle user registration requests."""
    if request.method != "POST":
        return JsonResponse(
            {"success": False, "message": "Only POST allowed"}, status=405
        )

    try:
        data = json.loads(request.body)
        register_request = RegisterRequest.from_dict(data)

        auth_service = get_auth_service()
        auth_service.register(register_request)

        return JsonResponse(
            {
                "success": True,
                "message": "Registration successful. Please check your email for confirmation.",
            }
        )

    except ValueError as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)

    except UserAlreadyExistsError:
        return JsonResponse(
            {"success": False, "message": "User already exists"}, status=400
        )

    except PendingConfirmationError:
        return JsonResponse(
            {
                "success": False,
                "message": "Confirmation email already sent. Please check your email.",
            },
            status=400,
        )

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)


@csrf_exempt
def confirm_email_view(request):
    """Handle email confirmation requests."""
    if request.method != "POST":
        return JsonResponse(
            {"success": False, "message": "Only POST allowed"}, status=405
        )

    try:
        data = json.loads(request.body)
        confirm_request = ConfirmEmailRequest.from_dict(data)

        auth_service = get_auth_service()
        auth_service.confirm_email(confirm_request)

        return JsonResponse(
            {
                "success": True,
                "message": "Email confirmed successfully. You can now log in.",
            }
        )

    except ValueError as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)

    except InvalidConfirmationError:
        return JsonResponse(
            {"success": False, "message": "Invalid confirmation link"}, status=400
        )

    except ConfirmationExpiredError:
        return JsonResponse(
            {"success": False, "message": "Confirmation link has expired"}, status=400
        )

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)


@csrf_exempt
def resend_confirmation_view(request):
    """Handle resend confirmation email requests."""
    if request.method != "POST":
        return JsonResponse(
            {"success": False, "message": "Only POST allowed"}, status=405
        )

    try:
        data = json.loads(request.body)
        resend_request = ResendConfirmationRequest.from_dict(data)

        auth_service = get_auth_service()
        auth_service.resend_confirmation(resend_request.email)

        return JsonResponse(
            {
                "success": True,
                "message": "Confirmation email sent successfully. Please check your email.",
            }
        )

    except ValueError as e:
        return JsonResponse({"success": False, "message": str(e)}, status=400)

    except UserAlreadyExistsError:
        return JsonResponse(
            {"success": False, "message": "Email already confirmed. You can log in."},
            status=400,
        )

    except NoPendingRegistrationError:
        return JsonResponse(
            {
                "success": False,
                "message": "No pending registration found. Please register again.",
            },
            status=400,
        )

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)