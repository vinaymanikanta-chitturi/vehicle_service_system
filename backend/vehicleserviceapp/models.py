from django.db import models

class Component(models.Model):
    name = models.CharField(max_length=255)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2)
    new_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    model = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    year = models.IntegerField()

    def __str__(self):
        return f'{self.manufacturer} {self.model} ({self.year})'

class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    issue_description = models.TextField()
    is_new_component = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.vehicle} - {self.component}'

class Service(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    service_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Service for {self.vehicle} on {self.service_date}'
