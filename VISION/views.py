from http.client import HTTPResponse
from django.http import JsonResponse
from django.shortcuts import render
from .jsonbase import JsonBase
import sys
import json
import cv2

sys.path.append('C:/Users/User/AppData/Local/Programs/Python/Python39/Lib/site-packages')
sys.path.append('C:/Users/User/AppData/Local/Programs/Python/Python39/Lib')


# 관리자 메인 페이지
def admin_form_view(request):
    context = {

    }


    
    return render(request, 'admin_form_view.html', context)

# 관리자 양식추가 페이지
def admin_form_make(request):
    context = {

    }
    
    context["boxData"] = [
        {"label": "asd", "x":100, "y":100, "w":100, "h":100},
        {"label": "123", "x":300, "y":300, "w":100, "h":250}
    ]
    
    return render(request, 'admin_form_make.html', context)


# 확인용 test함수
def test(request):
    context = {}

    return render(request, 'test.html')

def python(request):
    
    with open('jsonbase.json', 'r', encoding='utf-8') as f:
        json_data = json.load(f)

    img = cv2.imread('./static/img/1-1.jpg')
    img1 = cv2.resize(img, (2480, 3508))
    for i in json_data[0]['lot']:
        (x, y, w, h) = (int(i['cx'] - i['w'] / 2), int(i['cy'] - i['h'] / 2), int(i['w']), int(i['h']))
        cv2.rectangle(img1, (x , y), (x + w, y + h), (255, 0, 0), 2)
    
    cv2.imwrite('temp1.jpg', img1)

def home(request):
    context = {}

    j = JsonBase('jsonbase.json')


    context['jsonData'] = j.all_data()

    return render(request, 'home.html', context)
