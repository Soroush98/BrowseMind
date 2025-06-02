import os
import json
import requests
import jwt
import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table, SECRET_KEY

FACEBOOK_APP_ID = os.getenv('FACEBOOK_APP_ID')
FACEBOOK_APP_SECRET = os.getenv('FACEBOOK_APP_SECRET')
FACEBOOK_REDIRECT_URI = os.getenv('FACEBOOK_REDIRECT_URI')

@csrf_exempt
def facebook_login_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        code = data.get('code')
        
        if not code:
            return JsonResponse({'success': False, 'message': 'Authorization code required'}, status=400)

        # Exchange authorization code for access token
        token_url = 'https://graph.facebook.com/v18.0/oauth/access_token'
        token_params = {
            'client_id': FACEBOOK_APP_ID,
            'client_secret': FACEBOOK_APP_SECRET,
            'code': code,
            'redirect_uri': FACEBOOK_REDIRECT_URI,
        }
        
        token_response = requests.get(token_url, params=token_params)
        token_json = token_response.json()
        
        if 'access_token' not in token_json:
            return JsonResponse({'success': False, 'message': 'Failed to get access token'}, status=400)

        # Get user info from Facebook
        user_info_url = f"https://graph.facebook.com/me?fields=id,name,email&access_token={token_json['access_token']}"
        user_response = requests.get(user_info_url)
        user_info = user_response.json()
        
        if 'email' not in user_info:
            return JsonResponse({'success': False, 'message': 'Facebook account must have email permission'}, status=400)

        email = user_info['email']
        name = user_info.get('name', '')
        
        # Check if user exists, if not create one
        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')
        
        if not user:
            users_table.put_item(Item={
                'email': email,
                'name': name,
                'provider': 'facebook',
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
def facebook_auth_url_view(request):
    """Returns the Facebook OAuth authorization URL"""
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Only GET allowed'}, status=405)
    
    auth_url = (
        f"https://www.facebook.com/v18.0/dialog/oauth?"
        f"client_id={FACEBOOK_APP_ID}&"
        f"redirect_uri={FACEBOOK_REDIRECT_URI}&"
        f"scope=email&"
        f"response_type=code"
    )
    
    return JsonResponse({'success': True, 'auth_url': auth_url})