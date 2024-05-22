import requests
# 3286be2f4dd955ac2d895c0e080ae0b305ce4a67

token =  'cc8a42dfd7b807b1be101d21d8cc40e0d21d0d17'

data = {
    'email':'samarpangupta1230@gmail.com',
    'password':'0123456789!'
}

headers ={
    'Authorization': f'Token {token}'
}
endpoint = "http://127.0.0.1:8000/login/"

resp = requests.post(endpoint,data=data ,headers=headers)
print(resp.json())