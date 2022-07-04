from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.home, name='home'),
    path('view/', views.admin_form_view, name='admin_form_view'),
    path('make/', views.admin_form_make, name='admin_form_make'),
    path('save/', views.save, name='save'),
    path('test/', views.test, name='test'),
]

if settings.DEBUG: 
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root = settings.MEDIA_ROOT
    )
