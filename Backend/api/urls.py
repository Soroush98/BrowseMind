from django.urls import path
from .views.login import login_view
from .views.logout import logout_view
from .views.email_confirmation import register_view, confirm_email_view, resend_confirmation_view
from .views.weblog import weblog_status_view, weblog_view
from .views.query import category_listing_view, selector_view
from .views.session import session_view
from .views.query import top_websites_view
from .views.google_auth import google_login_view, google_auth_url_view
from .views.facebook_auth import facebook_login_view, facebook_auth_url_view, facebook_config_test_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),    
    path('confirm-email/', confirm_email_view, name='confirm_email'),
    path('register/', register_view, name='register_email'),
    path('resend-confirmation/', resend_confirmation_view, name='resend_confirmation'),
    path('weblog/', weblog_view, name='weblog'),
    path('status/', weblog_status_view, name ='weblog_status'),
    path('selector/', selector_view, name ='selector'),
    path('category_listing/', category_listing_view, name ='category_listing'),
    path('session/', session_view, name ='session_view'),
    path('top_websites/', top_websites_view, name='top_websites'),
    path('google-login/', google_login_view, name='google_login'),
    path('google-auth-url/', google_auth_url_view, name='google_auth_url'),
    path('facebook-login/', facebook_login_view, name='facebook_login'),
    path('facebook-auth-url/', facebook_auth_url_view, name='facebook_auth_url'),
    path('facebook-config-test/', facebook_config_test_view, name='facebook_config_test'),
]