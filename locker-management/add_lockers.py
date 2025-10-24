import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locker_system.settings')
django.setup()

from lockers.models import Locker

lockers_data = [
    {'locker_number': '101', 'location': 'Building A - Floor 1', 'status': 'available'},
    {'locker_number': '102', 'location': 'Building A - Floor 1', 'status': 'available'},
    {'locker_number': '103', 'location': 'Building A - Floor 1', 'status': 'available'},
    {'locker_number': '104', 'location': 'Building A - Floor 1', 'status': 'available'},
    {'locker_number': '201', 'location': 'Building A - Floor 2', 'status': 'available'},
    {'locker_number': '202', 'location': 'Building A - Floor 2', 'status': 'available'},
    {'locker_number': '203', 'location': 'Building A - Floor 2', 'status': 'available'},
    {'locker_number': '204', 'location': 'Building A - Floor 2', 'status': 'available'},
    {'locker_number': '301', 'location': 'Building B - Floor 1', 'status': 'available'},
    {'locker_number': '302', 'location': 'Building B - Floor 1', 'status': 'available'},
    {'locker_number': '303', 'location': 'Building B - Floor 1', 'status': 'available'},
    {'locker_number': '304', 'location': 'Building B - Floor 1', 'status': 'available'},
]

for locker_data in lockers_data:
    locker, created = Locker.objects.get_or_create(
        locker_number=locker_data['locker_number'],
        defaults={'location': locker_data['location'], 'status': locker_data['status']}
    )
    if created:
        print(f"Created locker: {locker.locker_number} at {locker.location}")
    else:
        print(f"Locker {locker.locker_number} already exists")

print(f"\nTotal lockers in database: {Locker.objects.count()}")
