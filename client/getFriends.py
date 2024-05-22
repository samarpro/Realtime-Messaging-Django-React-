import requests

endpoint = "http://127.0.0.1:8000/home/"
token = '3286be2f4dd955ac2d895c0e080ae0b305ce4a67'
headers = {
    'Authorization': f'Token {token}'
}

resp = requests.get(endpoint, headers=headers)
print(resp.json())