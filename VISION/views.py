from http.client import HTTPResponse
from django.http import JsonResponse
from django.shortcuts import render
from .jsonbase import JsonBase
from .models import Document
import os
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
        {"label": "label", "x":100, "y":100, "w":100, "h":100}
    ]
    
    return render(request, 'admin_form_make.html', context)


# 확인용 test함수
def test(request):
    context = {}

    return render(request, 'test.html')

def home(request):
    context = {}

    j = JsonBase('jsonbase.json')
    context['jsonData'] = j.all_data()

    if request.method == "POST":

        title = request.POST["input_title"]
        doc = Document.objects.filter(title=title)

        # 똑같은 양식명에 파일이 한개라도 있다면 overwriting
        if doc.count():
            doc[0].images = request.FILES['input_file']
            doc[0].save()

        # 양식명이 똑같은 것이 없다면 new save
        else:
            document = Document()
            document.title = request.POST["input_title"]
            document.images = request.FILES['input_file']
            document.save()

        # documents = Document.objects.last()

        with open('jsonbase.json', 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        base = 'media\images'
        img = cv2.imread(os.path.join(base, str(request.FILES['input_file'])))
        img1 = cv2.resize(img, (2480, 3508))
        
        data = (d for d in json_data if d['form_title'] == request.POST["input_title"])
        data_lot = next(data)['lot']
        print(data_lot)

        for i in data_lot:
                (x, y, w, h) = (int(i['cx'] - i['w'] / 2), int(i['cy'] - i['h'] / 2), int(i['w']), int(i['h']))
                cv2.rectangle(img1, (x , y), (x + w, y + h), (255, 0, 0), 2)

        ret, jpeg = cv2.imencode('.jpg', img1)
        cv2.imwrite('./media/temp1.jpg', img1)
        
        context['ret'] = ret
        context['files'] = 'media/temp1.jpg'

    return render(request, 'home.html', context)