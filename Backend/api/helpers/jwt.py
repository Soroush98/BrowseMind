
import jwt
import os 
import boto3

SECRET_KEY = os.environ.get("JWT_SECRET")
dynamodb = boto3.resource(
    'dynamodb',
    region_name=os.environ.get("AWS_REGION"),
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

users_table = dynamodb.Table('BM_Users')
urls_table = dynamodb.Table('BM_URLs')
weblogs_table = dynamodb.Table('BM_WebLogs')

def get_email_from_jwt(request):
    token = request.COOKIES.get('token')
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload.get('email')
    except Exception:
        return None
