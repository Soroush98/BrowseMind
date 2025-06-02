import os
import json
import requests
import jwt
import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table, SECRET_KEY

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI')

@csrf_exempt
def google_login_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        code = data.get('code')
        
        if not code:
            return JsonResponse({'success': False, 'message': 'Authorization code required'}, status=400)

        # Exchange authorization code for access token
        token_url = 'https://oauth2.googleapis.com/token'
        token_data = {
            'client_id': GOOGLE_CLIENT_ID,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
        }
        
        token_response = requests.post(token_url, data=token_data)
        token_json = token_response.json()
        
        if 'access_token' not in token_json:
            return JsonResponse({'success': False, 'message': 'Failed to get access token'}, status=400)

        # Get user info from Google
        user_info_url = f"https://www.googleapis.com/oauth2/v2/userinfo?access_token={token_json['access_token']}"
        user_response = requests.get(user_info_url)
        user_info = user_response.json()
        
        if 'email' not in user_info:
            return JsonResponse({'success': False, 'message': 'Failed to get user email'}, status=400)

        email = user_info['email']
        name = user_info.get('name', '')
        
        # Check if user exists, if not create one
        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')
        if not user:
            users_table.put_item(Item={
                'email': email,
                'name': name,
                'provider': 'google',
                'created_at': str(datetime.datetime.utcnow())
            })

        # Generate JWT token
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

@csrf_exempt
def google_auth_url_view(request):
    """Returns the Google OAuth authorization URL"""
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Only GET allowed'}, status=405)
    
    auth_url = (
        f"https://accounts.google.com/o/oauth2/auth?"
        f"client_id={GOOGLE_CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&"
        f"scope=openid%20email%20profile&"
        f"response_type=code&"
        f"access_type=offline"
    )
    
    return JsonResponse({'success': True, 'auth_url': auth_url})