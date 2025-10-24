from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'locker', 'reserved_at', 'reserved_until', 'is_active', 'created_at']
    list_filter = ['is_active', 'reserved_at', 'reserved_until']
    search_fields = ['user__username', 'user__email', 'locker__locker_number', 'locker__location']
    readonly_fields = ['reserved_at', 'created_at', 'updated_at']
    date_hierarchy = 'reserved_at'
    ordering = ['-reserved_at']
    
    fieldsets = (
        ('Reservation Details', {
            'fields': ('user', 'locker', 'reserved_until', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('reserved_at', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object
            return self.readonly_fields + ['user', 'locker']
        return self.readonly_fields
