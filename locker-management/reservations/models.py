from django.db import models
from django.conf import settings
from lockers.models import Locker


class Reservation(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    locker = models.ForeignKey(
        Locker, 
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    reserved_at = models.DateTimeField(auto_now_add=True)
    reserved_until = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'reservations'
        ordering = ['-reserved_at']
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'
        
    def __str__(self):
        return f"{self.user.username} - Locker {self.locker.locker_number}"
    
    def save(self, *args, **kwargs):
        # Update locker status when reservation is created
        if self.is_active and self.pk is None:  # New reservation
            self.locker.status = 'reserved'
            self.locker.save()
        # Update locker status when reservation is deactivated
        elif not self.is_active and self.pk is not None:
            self.locker.status = 'available'
            self.locker.save()
        super().save(*args, **kwargs)
