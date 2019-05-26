from functools import wraps
from flask import request, Response

apiKey="46070D4BF934FB0D4B06D9E2C46E346944E322444900A435D7D9A95E6D7435F5"

def check_auth(token):
    return token == apiKey

def authenticate():
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to send the proper api key', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get("Authorization")
        if not auth or not check_auth(auth):
            return authenticate()
        return f(*args, **kwargs)
    return decorated