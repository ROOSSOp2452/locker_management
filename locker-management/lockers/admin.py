from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Locker


@admin.register(Locker)
class LockerAdmin(admin.ModelAdmin):
    list_display = ['locker_number', 'location', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'location', 'created_at']
    search_fields = ['locker_number', 'location']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['locker_number']
    
    fieldsets = (
        ('Locker Information', {
            'fields': ('locker_number', 'location', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
