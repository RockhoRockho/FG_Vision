from django.shortcuts import render
from VISION.jsonbase import JsonBase

def home(request):
    context = {}

    j = JsonBase('jsonbase.json')


    context['jsonData'] = j.all_data()

    return render(request, 'home.html', context)
