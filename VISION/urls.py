from django.urls import path
from . import views

urlpatterns = [
    path('', views.vision, name='vision'),
]
