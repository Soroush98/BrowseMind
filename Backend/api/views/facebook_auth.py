import os
import json
import requests
import jwt
import datetime
import secrets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table, SECRET_KEY

FACEBOOK_APP_ID = os.environ.get('FACEBOOK_APP_ID')
FACEBOOK_APP_SECRET = os.environ.get('FACEBOOK_APP_SECRET')
FACEBOOK_REDIRECT_URI = os.environ.get('FACEBOOK_REDIRECT_URI')

@csrf_exempt
def facebook_login_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        code = data.get('code')
        state = data.get('state')  # Optional state parameter for validation
        
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
            error_message = token_json.get('error', {}).get('message', 'Failed to get access token')
            return JsonResponse({'success': False, 'message': error_message}, status=400)

        access_token = token_json['access_token']
        
        # Get user info from Facebook
        user_info_url = f"https://graph.facebook.com/me?fields=id,name,email&access_token={access_token}"
        user_response = requests.get(user_info_url)
        user_info = user_response.json()
        
        if 'error' in user_info:
            error_message = handle_facebook_error(user_info)
            return JsonResponse({'success': False, 'message': error_message}, status=400)
        
        if 'email' not in user_info:
            return JsonResponse({'success': False, 'message': 'Facebook account must have email permission'}, status=400)

        email = user_info['email']
        name = user_info.get('name', '')
        facebook_id = user_info.get('id', '')
        
        # Check if user exists, if not create one
        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')
        
        if not user:
            # Create new user with Facebook info
            users_table.put_item(Item={
                'email': email,
                'name': name,
                'provider': 'facebook',
                'facebook_id': facebook_id,
                'created_at': str(datetime.datetime.utcnow()),
                'confirmed': True,  # Facebook accounts are pre-confirmed
                'last_login': str(datetime.datetime.utcnow())  # Track last login time
            })
        else:
            # Update existing user with Facebook info if they signed up with email first
            users_table.update_item(
                Key={'email': email},
                UpdateExpression='SET facebook_id = :fb_id, confirmed = :confirmed, last_login = :last_login',
                ExpressionAttributeValues={
                    ':fb_id': facebook_id,
                    ':confirmed': True,
                    ':last_login': str(datetime.datetime.utcnow())
                }
            )

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
    """Returns the Facebook OAuth authorization URL with state parameter for security"""
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Only GET allowed'}, status=405)
    
    # Generate state parameter for CSRF protection
    state = secrets.token_urlsafe(32)
    
    auth_url = (
        f"https://www.facebook.com/v18.0/dialog/oauth?"
        f"client_id={FACEBOOK_APP_ID}&"
        f"redirect_uri={FACEBOOK_REDIRECT_URI}&"
        f"scope=email&"
        f"state={state}&"
        f"response_type=code"
    )
    
    return JsonResponse({
        'success': True, 
        'auth_url': auth_url,
        'state': state
    })

@csrf_exempt
def facebook_config_test_view(request):
    """Test Facebook OAuth configuration - for debugging purposes"""
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Only GET allowed'}, status=405)
    
    config_status = {
        'facebook_app_id': FACEBOOK_APP_ID is not None,
        'facebook_app_secret': FACEBOOK_APP_SECRET is not None,
        'facebook_redirect_uri': FACEBOOK_REDIRECT_URI is not None,
        'facebook_app_id_value': FACEBOOK_APP_ID if FACEBOOK_APP_ID else 'Not set',
        'facebook_redirect_uri_value': FACEBOOK_REDIRECT_URI if FACEBOOK_REDIRECT_URI else 'Not set',
    }
    
    return JsonResponse({
        'success': True,
        'config': config_status,
        'message': 'Facebook OAuth configuration check complete'
    })

def handle_facebook_error(error_data):
    """Handle Facebook API errors with proper error messages"""
    if isinstance(error_data, dict) and 'error' in error_data:
        error_info = error_data['error']
        error_code = error_info.get('code', 'unknown')
        error_message = error_info.get('message', 'Unknown Facebook error')
        
        # Map common Facebook errors to user-friendly messages
        error_mapping = {
            '190': 'Facebook access token is invalid or expired',
            '100': 'Facebook API request was invalid',
            '102': 'Facebook session key is invalid',
            '104': 'Facebook access token is required',
        }
        
        user_message = error_mapping.get(str(error_code), error_message)
        return f"Facebook authentication failed: {user_message}"
    
    return "Facebook authentication failed"