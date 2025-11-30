"""
Weblog view - thin HTTP layer for browser activity logging.
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from huey.contrib.djhuey import db_task
from ..dependencies import get_email_from_request
from ..helpers.jwt import urls_table, weblogs_table
from ..services.weblog_service import WeblogService


# Initialize service
_weblog_service = WeblogService(urls_table, weblogs_table)


@db_task()
def process_weblog(url, html_content, timestamp, duration, email):
    """Background task to process weblog entry."""
    try:
        _weblog_service.process(url, html_content, timestamp, duration, email)
        print("[✓] Weblog processed successfully")
    except Exception as e:
        print(f"[✗] Failed to process weblog: {str(e)}")

@csrf_exempt
def weblog_view(request):
    """Handle weblog submission requests."""
    if request.method != "POST":
        return JsonResponse(
            {"success": False, "message": "Only POST allowed"}, status=405
        )
    try:
        email = get_email_from_request(request)
        if not email:
            return JsonResponse(
                {"success": False, "message": "Invalid or missing JWT"}, status=401
            )
        data = json.loads(request.body)
        url = data.get("url")
        html_content = data.get("html")
        timestamp = data.get("timestamp")
        duration = data.get("duration")
        print(f"weblogging : {url}, {timestamp}, {duration}, {email}")
        job = process_weblog.schedule(
            (url, html_content, timestamp, duration, email), delay=0
        )
        print(f"Is being processed with Job ID: {job.id} and url: {url}")
        return JsonResponse(
            {"success": True, "message": "Weblog is being processed", "job_id": job.id},
            status=202,
        )
    except Exception as e:
        print(f"Error in weblog_view: {str(e)}")
        return JsonResponse({"success": False, "message": str(e)}, status=500)


@csrf_exempt
def weblog_status_view(request):
    """Check weblog processing status."""
    if request.method != "GET":
        return JsonResponse(
            {"success": False, "message": "Only GET allowed"}, status=405
        )
    try:
        job_id = request.GET.get("job_id")
        if not job_id:
            return JsonResponse(
                {"success": False, "message": "Job ID is required"}, status=400
            )
        result = process_weblog.huey.get(job_id)
        if result is None:
            return JsonResponse(
                {"success": False, "message": "Job not found"}, status=404
            )
        status = result.status
        value = result.value if status == "FINISHED" else None
        return JsonResponse({"success": True, "status": status, "result": value})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
