from django.shortcuts import render, redirect
from .jsonbase import JsonBase
from .models import Document
from .vision import vision
from django.contrib import messages
import os
import json
import cv2
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
from .vision2 import vision2

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
        {"label": "label", "x":100, "y":100, "w":100, "h":100, "type": "type"}
    ]
    
    return render(request, 'admin_form_make.html', context)


# 확인용 test함수
def test(request):
    context = {}

    data_title = request.POST["data_title"]
    data_file = json.loads(request.POST["data_file"])

    print(data_title)
    print(data_file)
    print(type(data_file))
    print(data_file[0])
    print(type(data_file[0]))

    return render(request, 'test.html')

def home(request):
    context = {}

    j = JsonBase('jsonbase.json')
    json_data = j.all_data()
    context['jsonData'] = json_data

    if request.method == "POST":

        title = request.POST["input_title"]
        image = request.FILES['input_file']
        print(image)
        doc = Document.objects.filter(images=image)

        # 똑같은 양식명에 파일이 한개라도 있다면 overwriting
        # if doc.count():
        #     doc[0].images = request.FILES['input_file']
        #     doc[0].save()

        # 양식명이 똑같은 것이 없다면 new save
        # else:
        document = Document()
        document.title = title
        document.images = request.FILES['input_file']
        document.save()

    
        # input_title이 없을때 자동인식 실시
        if not title:
            # 모든 데이터 첫번째 label 제목만 불러와 적용후 일치시 title 도출
            titles = []
            for i in json_data:
                titles.append(i['form_title'])

            for data in json_data:
                w = data['lot'][0]['w']
                h = data['lot'][0]['h']
                cx = data['lot'][0]['cx']
                cy = data['lot'][0]['cy']

                base = 'media/images/'
                img = cv2.imread(base + str(request.FILES['input_file']))
                img = cv2.resize(img, (2480, 3508))

                img_r = cv2.getRectSubPix(
                            img,
                            patchSize=(w, h),
                            center=(cx, cy),
                    )
                img_gray = cv2.cvtColor(img_r, cv2.COLOR_BGR2GRAY)
                img_blur = cv2.GaussianBlur(img_gray, (5, 5), 0)

                ret, img_th = cv2.threshold(img_blur, 120, 230, cv2.THRESH_BINARY_INV)

                options = "--oem 1 --psm 7"

                title = pytesseract.image_to_string(cv2.cvtColor(img_th, cv2.COLOR_BGR2RGB), config=options, lang='Hangul')
                title = title.replace(' ', '').replace('\n', '')

                # 파일에 일치하는 제목을 찾는다면 아까 빈파일에 저장한 값에 overwriting 한다
                if title in titles:
                    doc = Document.objects.last()
                    doc.title = title
                    doc.save()
                    break
                
                # 만약 아무것도 일치하는 것이 없다면
                title = None
        
        context['title'] = title

        # title이 없다면 여기서 그냥 return 시킨다
        if title == None:
            return render(request, 'home.html', context)

        base = 'media/images/'
        # if not os.path.exists(os.path.join(base, str(request.FILES['input_file'])))
        img = cv2.imread(base + str(request.FILES['input_file']))
        img1 = cv2.resize(img, (2480, 3508))
        
        data = j.search_data(title)

        for i in data[0]['lot']:
                (x, y, w, h) = (int(i['cx'] - i['w'] / 2), int(i['cy'] - i['h'] / 2), int(i['w']), int(i['h']))
                cv2.rectangle(img1, (x , y), (x + w, y + h), (255, 0, 0), 2)

        ret, _ = cv2.imencode('.jpg', img1)
        cv2.imwrite('./media/temp1.jpg', img1)
        
        form_number = j.search_number_from_title(title)
        
        # form number, image
        csv_table = vision(form_number, (base + str(request.FILES['input_file'])))

        context['ret'] = ret
        context['files'] = 'media/temp1.jpg'
        context['csv_files'] = csv_table

    return render(request, 'home.html', context)


# 양식 jsonbase.json에 저장
def save(request):
    data_title = request.POST["data_title"]
    data_ret = request.POST["data_ret"]
    data_lot = json.loads(request.POST["data_lot"])

    data = {
        "form_title": data_title,
        "form_ret": data_ret,
        "lot": [],
    }

    for d in data_lot:
        data["lot"].append(d)

    print(data)

    j = JsonBase('jsonbase.json')
    if j.update_data(data):
        print('\nsave\n')
    else:
        print('\nfail\n')



    return redirect('admin_form_make')


# id OCR 페이지
def idcard(request):
    context = {}

    if request.method == "POST":
        image = request.POST["ifile"]
        # image = request.FILES['input_file']
        kind = request.POST['idcard']

        document = Document()
        document.images = request.FILES['ifile']
        document.save()

        context['fifi'] = image
        context['kiki'] = kind

        # if kind.count():
        #     base = 'media/images/'
        #     # if not os.path.exists(os.path.join(base, str(request.FILES['input_file'])))
        #     img = cv2.imread(base + str(request.FILES['i-file']))

        rett, _ = cv2.imencode('.jpg', image)
        cv2.imwrite('./media/temp2.jpg', image)
            
        csv_table = vision2(kind, './media/temp2.jpg')
        context['rett'] = rett
        context['filess'] = 'media/temp2.jpg'
        context['csv_filess'] = csv_table
            
    return render(request, 'idcard.html', context)

def passs(request):
    ppw = "1234"
    if request.POST.get('password') == ppw:
        return render(request, 'admin_form_make.html')
    else: 
        # messages.warning(request, "입장할 수 없습니다.")
        return render(request, 'pass.html')