import os
import json
import boto3
import requests
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table
@csrf_exempt
def register_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'message': 'Email and password required'}, status=400)

        # Check if user already exists
        response = users_table.get_item(Key={'email': email})
        if 'Item' in response:
            return JsonResponse({'success': False, 'message': 'Email already registered'}, status=409)

        # Hash the password
        import hashlib
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Add new user
        users_table.put_item(Item={'email': email, 'password': hashed_password})
        return JsonResponse({'success': True, 'message': 'Registration successful'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)