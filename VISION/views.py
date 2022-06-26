from django.shortcuts import render

def vision(request):
    context = {}
    
    return render(request, 'vision.html', context)
