from django.db import models


class Locker(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('maintenance', 'Maintenance'),
    ]
    
    locker_number = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=200)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='available'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lockers'
        ordering = ['locker_number']
        verbose_name = 'Locker'
        verbose_name_plural = 'Lockers'
        
    def __str__(self):
        return f"Locker {self.locker_number} - {self.location}"
