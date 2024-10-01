# vehicleserviceapp/tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .models import Service
from datetime import date, timedelta

#tests written using google and chatgpt
class RevenueSummaryTests(TestCase):

    def setUp(self):
        # Create some test data for the Service model
        Service.objects.create(service_date=date.today(), total_price=100)
        Service.objects.create(service_date=date.today() - timedelta(days=1), total_price=200)
        Service.objects.create(service_date=date.today() - timedelta(days=30), total_price=300)

    def test_revenue_summary(self):
        response = self.client.get(reverse('revenue_summary'))  # Use the correct name for your URL
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check if the response data includes the keys we expect
        self.assertIn('daily_revenue', response.data)
        self.assertIn('monthly_revenue', response.data)
        self.assertIn('yearly_revenue', response.data)
        self.assertIn('chartData', response.data)

        # Check the values of daily revenue
        self.assertEqual(response.data['daily_revenue'], 100)  # Expected daily revenue for today
        self.assertEqual(response.data['monthly_revenue'], 300)  # Expected revenue in the last month
        self.assertEqual(response.data['yearly_revenue'], 300)  # Expected revenue in the last year

        # Check the chart data length (should be 30 days)
        self.assertEqual(len(response.data['chartData']), 30)

    def tearDown(self):
        # Clean up the test data after each test
        Service.objects.all().delete()
