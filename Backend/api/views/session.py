import os
import json
import requests
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import get_email_from_jwt

@csrf_exempt
def session_view(request):
    if request.method != 'GET':
        return JsonResponse({'ok': False, 'message': 'Only GET allowed'}, status=405)
    email = get_email_from_jwt(request)
    if email:
        return JsonResponse({'ok': True, 'email': email})
    else:
        return JsonResponse({'ok': False, 'email': None})