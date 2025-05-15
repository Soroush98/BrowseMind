# Backend/api/views.py
import os
import json
import requests
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import openai
from openai import AsyncOpenAI
client = AsyncOpenAI()
# Set the OpenAI API key
client.api_key = os.getenv("OPENAI_API_KEY")

@csrf_exempt
async def analyze_url(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    try:
        # Parse the request body to get the URL
        body = json.loads(request.body)
        url = body.get("url")
        if not url:
            return JsonResponse({"error": "URL is required."}, status=400)

        # Fetch the HTML content
        try:
            html_content = requests.get(url, timeout=10).text
        except Exception as e:
            return JsonResponse({"error": f"Failed to fetch URL: {str(e)}"}, status=500)
        categories = ["sports", "news", "entertainment", "technology", "health", "finance", "education"]
        prompt = (
            f"Categorize the following HTML content into one of these categories, only reply with category and nothing else.If it wasnt in any of those categories reply generic:\n"
            f"{', '.join(categories)}.\n\n"
            f"HTML Content:\n{html_content[:2000]}"
        )

        # Call the API
        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=50,
            temperature=0,
        )
        category = response.choices[0].message.content.strip().lower()
        print(f"Category: {category}")
        return JsonResponse({"url": url, "category": category})

    except Exception as e:
        print(f"Error: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)
