from django.urls import path
from .views import login_view
from .views import weblog_view
from .views import register_view
from .views import weblog_status_view
from .views import selector_view
from .views import category_listing_view
urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('weblog/', weblog_view, name='weblog'),
    path('status/', weblog_status_view, name ='weblog_status'),
    path('selector/', selector_view, name ='selector'),
    path('category_listing/', category_listing_view, name ='category_listing')
]