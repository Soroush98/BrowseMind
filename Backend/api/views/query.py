import os
import json
import boto3
import requests
import jwt 
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from ..helpers.jwt import weblogs_table, get_email_from_jwt

@csrf_exempt
def selector_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)
    try:
        email = get_email_from_jwt(request)
        if not email:
            return JsonResponse({'success': False, 'message': 'Invalid or missing JWT'}, status=401)
        data = json.loads(request.body)
        from_date = data.get('from')
        to_date = data.get('to')
        if not from_date or not to_date:
            return JsonResponse({'success': False, 'message': 'Both from and to dates are required'}, status=400)
        # Query BM_WebLogs for entries in the timeframe
        scan_response = weblogs_table.scan()
        items = scan_response.get('Items', [])
        # Filter by timestamp and email
        filtered = [item for item in items if from_date <= item.get('timestamp', '') <= to_date and item.get('email') == email]
        # Aggregate duration per category
        category_durations = {}
        total_duration = 0
        for item in filtered:
            category = item.get('category', 'uncategorized')
            duration = int(item.get('duration', 0))
            category_durations[category] = category_durations.get(category, 0) + duration
            total_duration += duration
        # Calculate share per category
        shares = {}
        for cat, dur in category_durations.items():
            shares[cat] = dur / total_duration * 100 if total_duration > 0 else 0
        return JsonResponse({'success': True, 'shares': shares})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@csrf_exempt
def category_listing_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Only POST allowed'}, status=405)
    try:
        email = get_email_from_jwt(request)
        if not email:
            return JsonResponse({'success': False, 'message': 'Invalid or missing JWT'}, status=401)
        data = json.loads(request.body)
        from_date = data.get('from')
        to_date = data.get('to')
        category = data.get('category')
        if not from_date or not to_date or not category:
            return JsonResponse({'success': False, 'message': 'from, to, and category are required'}, status=400)
        scan_response = weblogs_table.scan()
        items = scan_response.get('Items', [])
        # Filter by timeframe, category, and email
        filtered = [item for item in items if from_date <= item.get('timestamp', '') <= to_date and item.get('category') == category and item.get('email') == email]
        # For each, calculate start and end time
        websites = []
        for item in filtered:
            url = item.get('url')
            start = item.get('timestamp')
            duration = int(item.get('duration', 0))
            # Calculate end time as start + duration (duration is in ms or s? Assuming ms, adjust if needed)
            try:
                start_dt = None
                if start:
                    from datetime import datetime, timedelta
                    start_dt = datetime.fromisoformat(start.replace('Z', '+00:00'))
                    end_dt = start_dt + timedelta(milliseconds=duration)
                    end = end_dt.isoformat()
                else:
                    end = ''
            except Exception:
                end = ''
            websites.append({
                'url': url,
                'start': start,
                'end': end
            })
        return JsonResponse({'success': True, 'websites': websites})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)