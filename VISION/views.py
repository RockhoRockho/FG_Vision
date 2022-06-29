from django.shortcuts import render

def vision(request):
    context = {}
    
    return render(request, 'vision.html', context)


def admin_form_view(request):
    context = {

    }
    
    return render(request, 'admin_form_view.html')


def admin_form_make(request):
    context = {

    }
    
    return render(request, 'admin_form_make.html')