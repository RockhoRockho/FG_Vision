from django.shortcuts import render

# 사용자 메인 페이지
def vision(request):
    context = {}
    
    return render(request, 'vision.html', context)


# 관리자 메인 페이지
def admin_form_view(request):
    context = {

    }
    
    return render(request, 'admin_form_view.html')

# 관리자 양식추가 페이지
def admin_form_make(request):
    context = {

    }
    
    return render(request, 'admin_form_make.html')