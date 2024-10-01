from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from django.utils.timezone import now
from datetime import timedelta
from .models import Component, Vehicle, Issue, Service
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, ServiceSerializer

# CRUD operations for Component
@api_view(['GET', 'POST'])
def component_list(request):
    if request.method == 'GET':
        components = Component.objects.all()
        serializer = ComponentSerializer(components, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ComponentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def component_detail(request, pk):
    try:
        component = Component.objects.get(pk=pk)
    except Component.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ComponentSerializer(component)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ComponentSerializer(component, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        component.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# CRUD operations for Vehicle
@api_view(['GET', 'POST'])
def vehicle_list(request):
    if request.method == 'GET':
        vehicles = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# CRUD operations for Issue
@api_view(['GET', 'POST'])
def issue_list(request):
    if request.method == 'GET':
        issues = Issue.objects.all()
        serializer = IssueSerializer(issues, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# CRUD operations for Service
@api_view(['GET', 'POST'])
def service_list(request):
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Helper function to calculate revenue for a specific time period
def get_revenue_for_period(start_date, end_date):
    return Service.objects.filter(service_date__range=[start_date, end_date]).aggregate(total_revenue=Sum('total_price'))['total_revenue'] or 0

# API to get daily, monthly, and yearly revenue, including historical data
@api_view(['GET'])
def revenue_summary(request):
    today = now().date()

    # Calculate daily, monthly, and yearly revenue
    daily_revenue = get_revenue_for_period(today, today + timedelta(days=1))
    
    start_of_month = today.replace(day=1)
    monthly_revenue = get_revenue_for_period(start_of_month, today + timedelta(days=1))
    
    start_of_year = today.replace(month=1, day=1)
    yearly_revenue = get_revenue_for_period(start_of_year, today + timedelta(days=1))

    # Prepare historical data for the last 30 days
    chart_data = []
    for i in range(30):
        date = today - timedelta(days=i)
        daily_revenue_for_day = get_revenue_for_period(date, date + timedelta(days=1))
        chart_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'daily_revenue': daily_revenue_for_day,
            'monthly_revenue': monthly_revenue,  # This can be calculated differently if needed
        })
    
    return Response({
        'daily_revenue': daily_revenue,
        'monthly_revenue': monthly_revenue,
        'yearly_revenue': yearly_revenue,
        'chartData': chart_data,  # Include the historical chart data
    }, status=status.HTTP_200_OK)
