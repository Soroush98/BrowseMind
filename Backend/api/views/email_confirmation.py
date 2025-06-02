import os
import json
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import users_table, SECRET_KEY
import boto3

# Email configuration
SMTP_HOST = os.environ.get('SMTP_HOST')
SMTP_PORT = int( os.environ.get('SMTP_PORT'))
SMTP_USER = os.environ.get('SMTP_USER')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
domain = os.environ.get('DOMAIN')

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
        if response.get('Item'):
            return JsonResponse({'success': False, 'message': 'User already exists'}, status=400)

        # Check if confirmation already pending
        response = users_table.get_item(Key={'email': email})
        if response.get('Item'):
            return JsonResponse({'success': False, 'message': 'Confirmation email already sent. Please check your email.'}, status=400)

        # Generate confirmation token
        confirmation_token = secrets.token_urlsafe(32)

        # Store pending user with hashed password
        import hashlib
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        import datetime
        users_table.put_item(Item={
            'email': email,
            'password': hashed_password,
            'confirmation_token': confirmation_token,
            'created_at': str(datetime.datetime.utcnow()),
            'expires_at': str(datetime.datetime.utcnow() + datetime.timedelta(hours=24))  # 24 hour expiry
        })

        # Send confirmation email
       
        confirmation_url = f"{domain}/confirm-email?token={confirmation_token}&email={email}"
        
        send_confirmation_email(email, confirmation_url)

        return JsonResponse({
            'success': True, 
            'message': 'Registration successful. Please check your email for confirmation.'
        })

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@csrf_exempt
def confirm_email_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        token = data.get('token')

        if not email or not token:
            return JsonResponse({'success': False, 'message': 'Email and token required'}, status=400)

        # Get pending user
        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')

        if not user:
            return JsonResponse({'success': False, 'message': 'Invalid confirmation link'}, status=400)

        if user.get('confirmation_token') != token:
            return JsonResponse({'success': False, 'message': 'Invalid confirmation token'}, status=400)

        # Check if expired
        import datetime
        expires_at = datetime.datetime.fromisoformat(user['expires_at'])
        if datetime.datetime.utcnow() > expires_at:
            # Clean up expired record
            users_table.delete_item(Key={'email': email})
            return JsonResponse({'success': False, 'message': 'Confirmation link has expired'}, status=400)

        # Create actual user account
        users_table.put_item(Item={
            'email': email,
            'password': user['password'],  # Already hashed
            'provider': 'email',
            'created_at': str(datetime.datetime.utcnow()),
            'confirmed': True
        })

        return JsonResponse({
            'success': True, 
            'message': 'Email confirmed successfully. You can now log in.'
        })

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@csrf_exempt
def resend_confirmation_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')

        if not email:
            return JsonResponse({'success': False, 'message': 'Email required'}, status=400)

        # Check if user already exists and is confirmed
        response = users_table.get_item(Key={'email': email})
        if response.get('Item') and response.get('Item').get('confirmed'):
            return JsonResponse({'success': False, 'message': 'Email already confirmed. You can log in.'}, status=400)

        # Get pending user
        response = users_table.get_item(Key={'email': email})
        user = response.get('Item')

        if not user:
            return JsonResponse({'success': False, 'message': 'No pending registration found. Please register again.'}, status=400)

        # Generate new confirmation token
        confirmation_token = secrets.token_urlsafe(32)

        # Update pending user with new token and extended expiry
        import datetime
        users_table.update_item(
            Key={'email': email},
            UpdateExpression='SET confirmation_token = :token, expires_at = :expires',
            ExpressionAttributeValues={
                ':token': confirmation_token,
                ':expires': str(datetime.datetime.utcnow() + datetime.timedelta(hours=24))
            }
        )

        # Send new confirmation email
        confirmation_url = f"{domain}/confirm-email?token={confirmation_token}&email={email}"
        send_confirmation_email(email, confirmation_url)

        return JsonResponse({
            'success': True, 
            'message': 'Confirmation email sent successfully. Please check your email.'
        })

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

def send_confirmation_email(email, confirmation_url):
    """Send confirmation email to user"""
    if not SMTP_USER or not SMTP_PASSWORD:
        print("SMTP credentials not configured, skipping email")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = "Confirm your BrowseMind account"

        body = f"""
        Welcome to BrowseMind!

        Please confirm your email address by clicking the link below:
        {confirmation_url}

        This link will expire in 24 hours.

        If you didn't create an account with BrowseMind, you can safely ignore this email.

        Best regards,
        The BrowseMind Team
        """

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(SMTP_USER, email, text)
        server.quit()

    except Exception as e:
        print(f"Error sending email: {e}")
        raise Exception("Failed to send confirmation email")