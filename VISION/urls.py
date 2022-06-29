from django.urls import path
from . import views

urlpatterns = [
    path('', views.vision, name='vision'),
    path('admin/', views.vision, name='admin_form_view'),
    path('admin/make/', views.vision, name='admin_form_make'),
]
