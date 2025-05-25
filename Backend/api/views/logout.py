from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def logout_view(request):
    response = JsonResponse({'success': True, 'message': 'Logged out'})
    response.delete_cookie('token', path='/', samesite='None')
    return response
