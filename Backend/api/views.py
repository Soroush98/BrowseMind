# Backend/api/views.py
import os
import json
import boto3
import requests
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
from huey.contrib.djhuey import task, db_task
from huey.api import Result


dynamodb = boto3.resource(
    'dynamodb',
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

table = dynamodb.Table('BM_Users')

def check_url(url):
    try:
        print(f"Checking URL: {url}")
        if not url:
            return None
        urls_table = dynamodb.Table('BM_URLs')
        url_response = urls_table.get_item(Key={'url': url})
        if 'Item' in url_response:
            return url_response['Item'].get('category', None)
        return None
    except Exception as e:
        print(f"Error in check_url: {str(e)}")
        return None

def analyze_url(url, html_content):
    try:
        categories = [
            "news", "social media", "communication", "entertainment", "education", "shopping",
            "finance", "technology", "health", "travel", "government", "legal", "adult",
            "religion", "politics", "career", "real estate", "automotive", "food",
            "lifestyle", "sports", "science", "web services", "email", "illegal"
        ]
        prompt = (
            f"Categorize the following HTML content into one of these categories, only reply with category and nothing else. "
            f"If it wasn't in any of those categories reply generic:\n"
            f"{', '.join(categories)}.\n\n"
            f"HTML Content:\n{html_content[:2000]}"
        )

        api_key = os.getenv("LLAMA_API_KEY")
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.llmapi.com"
        )

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama4-maverick",
            stream=False
        )

        category = chat_completion.choices[0].message.content.strip().lower()
        print(f"Category: {category}")
        # Insert into BM_URLs table
        urls_table = dynamodb.Table('BM_URLs')
        urls_table.put_item(Item={
            'url': url,
            'category': category
        })
        return category

    except Exception as e:
        print(f"Error in analyze_url: {str(e)}")
        return None




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

        response = table.get_item(Key={'email': email})
        user = response.get('Item')

        if not user:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        import hashlib
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        if user.get('password') != hashed_password:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        # Set HttpOnly cookie (simple example, not a real session)
        
        return JsonResponse({'success': True, 'message': 'Login successful'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)


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
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            return JsonResponse({'success': False, 'message': 'Email already registered'}, status=409)

        # Hash the password
        import hashlib
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Add new user
        table.put_item(Item={'email': email, 'password': hashed_password})
        return JsonResponse({'success': True, 'message': 'Registration successful'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@db_task()
def process_weblog(url, html_content, timestamp, duration, email):
    try:
        # Check if URL exists in BM_URLs
        category = check_url(url)
        # If not categorized, analyze the URL
        if not category:
            category = analyze_url(url, html_content)
        # Get the last id in BM_WebLogs
        weblogs_table = dynamodb.Table('BM_WebLogs')
        scan_response = weblogs_table.scan(ProjectionExpression='#i', ExpressionAttributeNames={'#i': 'id'})
        items = scan_response.get('Items', [])
        if items:
            max_id = max([item.get('id', -1) for item in items])
            new_id = max_id + 1
        else:
            new_id = 0
        # Add weblog entry (id, email, url, timestamp, duration, category)
        weblogs_table.put_item(Item={
            'id': new_id,
            'email': email,
            'url': url,
            'timestamp': timestamp,
            'duration': duration,
            'category': category
        })
        print("[✓] Weblog processed successfully")
    except Exception as e:
        print(f"[✗] Failed to process weblog: {str(e)}")

@csrf_exempt
def weblog_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)
    try:
        data = json.loads(request.body)
        url = data.get('url')
        html_content = data.get('html')
        timestamp = data.get('timestamp')
        duration = data.get('duration')
        email = data.get('email')
        print(f"weblogging : {url}, {timestamp}, {duration}, {email}")
        # Enqueue the task to process the weblog asynchronously using Huey
        job = process_weblog.schedule((url, html_content, timestamp, duration, email), delay=0)
        # Respond immediately with job id
        print(f"Is being processed with Job ID: {job.id} and url: {url}")
        return JsonResponse({'success': True, 'message': 'Weblog is being processed', 'job_id': job.id}, status=202)
    except Exception as e:
        print(f"Error in weblog_view: {str(e)}")
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@csrf_exempt
def weblog_status_view(request):
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Only GET allowed'}, status=405)
    try:
        job_id = request.GET.get('job_id')
        if not job_id:
            return JsonResponse({'success': False, 'message': 'Job ID is required'}, status=400)
        result = process_weblog.huey.get(job_id)
        if result is None:
            return JsonResponse({'success': False, 'message': 'Job not found'}, status=404)
        status = result.status
        value = result.value if status == 'FINISHED' else None
        return JsonResponse({'success': True, 'status': status, 'result': value})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)


