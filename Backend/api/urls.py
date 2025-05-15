from django.urls import path
from .views import analyze_url

urlpatterns = [
    path("analyze_url/", analyze_url, name="analyze_url"),
]