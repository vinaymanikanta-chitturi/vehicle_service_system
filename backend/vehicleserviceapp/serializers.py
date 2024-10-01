from rest_framework import serializers
from .models import Component, Vehicle, Issue, Service

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer(read_only=True)
    component = ComponentSerializer(read_only=True)

    class Meta:
        model = Issue
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer(read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
