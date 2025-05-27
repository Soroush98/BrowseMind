from django.urls import path
from .views.login import login_view
from .views.logout import logout_view
from .views.register import register_view
from .views.weblog import weblog_status_view, weblog_view
from .views.query import category_listing_view, selector_view
from .views.session import session_view
from .views.query import top_websites_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('weblog/', weblog_view, name='weblog'),
    path('status/', weblog_status_view, name ='weblog_status'),
    path('selector/', selector_view, name ='selector'),
    path('category_listing/', category_listing_view, name ='category_listing'),
    path('session/', session_view, name ='session_view'),
    path('top_websites/', top_websites_view, name='top_websites'),
]