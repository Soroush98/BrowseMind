import os
import json
import boto3
import requests
import jwt  # Ensure this is PyJWT, not the built-in jwt module
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table, SECRET_KEY

@csrf_exempt
def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'message': 'Email and password required'}, status=400)

        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')

        if not user:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        import hashlib
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()        
        if user.get('password') != hashed_password:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        # Check if email is confirmed
        if not user.get('confirmed', False):
            return JsonResponse({
                'success': False, 
                'message': 'Please confirm your email address before logging in',
                'redirect': 'check-email',
                'email': email
            }, status=403)

        # Generate JWT token
        import datetime
        payload = {
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        response = JsonResponse({'success': True, 'message': 'Login successful', 'token': token})
        response.set_cookie(
            key='token',
            value=token,
            httponly=True,
            secure=True,
            samesite='None',
            max_age=7 * 24 * 60 * 60  # 7 days in seconds
        )
        return response

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)