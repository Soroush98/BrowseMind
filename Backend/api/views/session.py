"""
Session view - thin HTTP layer.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..dependencies import get_email_from_request


@csrf_exempt
def session_view(request):
    """Check if user has a valid session."""
    if request.method != "GET":
        return JsonResponse({"ok": False, "message": "Only GET allowed"}, status=405)

    email = get_email_from_request(request)
    if email:
        return JsonResponse({"ok": True, "email": email})
    else:
        return JsonResponse({"ok": False, "email": None})