"""
Weblog service - business logic for browser activity logging.
"""
import os
from typing import Optional

from openai import OpenAI


# Website categories
CATEGORIES = [
    "news",
    "social media",
    "communication",
    "entertainment",
    "education",
    "shopping",
    "finance",
    "technology",
    "health",
    "travel",
    "government",
    "legal",
    "adult",
    "religion",
    "politics",
    "career",
    "real estate",
    "automotive",
    "food",
    "lifestyle",
    "sports",
    "science",
    "web services",
    "email",
    "illegal",
]


class WeblogService:
    """Service for processing browser activity logs."""

    def __init__(self, urls_table, weblogs_table):
        self._urls_table = urls_table
        self._weblogs_table = weblogs_table

    def process(
        self,
        url: str,
        html_content: str,
        timestamp: str,
        duration: int,
        email: str,
    ) -> None:
        """Process a weblog entry."""
        # Check if URL already categorized
        category = self._get_cached_category(url)

        # If not categorized, analyze with AI
        if not category:
            category = self._analyze_and_cache_url(url, html_content)

        # Generate new ID
        new_id = self._get_next_id()

        # Store weblog entry
        self._weblogs_table.put_item(
            Item={
                "id": new_id,
                "email": email,
                "url": url,
                "timestamp": timestamp,
                "duration": duration,
                "category": category,
            }
        )

    def _get_cached_category(self, url: str) -> Optional[str]:
        """Check if URL already has a cached category."""
        try:
            if not url:
                return None
            print(f"Checking URL: {url}")
            response = self._urls_table.get_item(Key={"url": url})
            if "Item" in response:
                return response["Item"].get("category")
            return None
        except Exception as e:
            print(f"Error in _get_cached_category: {str(e)}")
            return None

    def _analyze_and_cache_url(self, url: str, html_content: str) -> Optional[str]:
        """Analyze URL content with AI and cache the result."""
        try:
            prompt = (
                f"Categorize the following HTML content into one of these categories, "
                f"only reply with category and nothing else. "
                f"If it wasn't in any of those categories reply generic:\n"
                f"{', '.join(CATEGORIES)}.\n\n"
                f"HTML Content:\n{html_content[:1000]}"
            )

            api_key = os.environ.get("LLAMA_API_KEY")
            client = OpenAI(api_key=api_key, base_url="https://api.llmapi.com")

            chat_completion = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama4-maverick",
                stream=False,
            )

            category = chat_completion.choices[0].message.content.strip().lower()
            print(f"Category: {category}")

            # Cache the category
            self._urls_table.put_item(Item={"url": url, "category": category})

            return category

        except Exception as e:
            print(f"Error in _analyze_and_cache_url: {str(e)}")
            if hasattr(e, "response") and e.response is not None:
                print("Response content:", e.response.text)
            return None

    def _get_next_id(self) -> int:
        """Get the next available ID for a weblog entry."""
        scan_response = self._weblogs_table.scan(
            ProjectionExpression="#i", ExpressionAttributeNames={"#i": "id"}
        )
        items = scan_response.get("Items", [])
        if items:
            max_id = max([item.get("id", -1) for item in items])
            return max_id + 1
        return 0
