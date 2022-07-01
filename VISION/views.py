from django.shortcuts import render
from .jsonbase import JsonBase

# 사용자 메인 페이지
def vision(request):
    context = {}
    
    return render(request, 'vision.html', context)


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