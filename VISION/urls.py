from django.urls import path
from . import views

urlpatterns = [
    path('', views.vision, name='vision'),
    path('admin/', views.admin_form_view, name='admin_form_view'),
    path('admin/make/', views.admin_form_make, name='admin_form_make'),
    path('test/', views.test, name='test'),
]
