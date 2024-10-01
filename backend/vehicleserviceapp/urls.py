from django.urls import path
from . import views

urlpatterns = [
    path('components/', views.component_list),
    path('components/<int:pk>/', views.component_detail),
    
    path('vehicles/', views.vehicle_list),
    
    path('issues/', views.issue_list),
    
    path('services/', views.service_list),
    
    path('revenue/', views.revenue_summary),
]
