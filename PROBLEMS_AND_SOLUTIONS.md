# Problems Faced & Solutions - Smart Storage Lockers

## Overview
This document details all the problems encountered during development and their solutions.

---

## 1. Database Configuration Issues

### Problem
- Initially configured with MySQL but needed to switch to PostgreSQL
- SQLite was set as default in Django settings
- Database connection errors on startup

### Solution
```python
# Updated settings.py
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv('DB_NAME', 'locker_db'),
        "USER": os.getenv('DB_USER', 'locker_user'),
        "PASSWORD": os.getenv('DB_PASSWORD', ''),
        "HOST": os.getenv('DB_HOST', 'localhost'),
        "PORT": os.getenv('DB_PORT', '5432'),
    }
}
```
- Installed `psycopg2-binary` package
- Created `.env` file with database credentials
- Used `python-dotenv` to load environment variables

---

## 2. Custom User Model Conflicts

### Problem
```
auth.User.groups: (fields.E304) Reverse accessor 'Group.user_set' clashes with 'authentication.User.groups'
```
- Django's default User model conflicted with custom User model
- ManyToMany relationships had naming conflicts

### Solution
```python
# authentication/models.py
class User(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True
    )

# settings.py
AUTH_USER_MODEL = 'authentication.User'
```
- Added `related_name` to avoid reverse accessor clashes
- Set `AUTH_USER_MODEL` in settings

---

## 3. Missing Django Apps and Middleware

### Problem
- REST Framework not installed in `INSTALLED_APPS`
- CORS middleware missing
- `ModuleNotFoundError: No module named 'rest_framework'`

### Solution
```python
# settings.py
INSTALLED_APPS = [
    # ...
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "authentication",
    "lockers",
    "reservations",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # Added
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

---

## 4. API Endpoints Not Found (404 Errors)

### Problem
```
POST /api/auth/register/ HTTP/1.1" 404
```
- URL patterns not configured in main `urls.py`
- Apps had no `urls.py` files

### Solution
```python
# locker_system/urls.py
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("authentication.urls")),
    path("api/lockers/", include("lockers.urls")),
    path("api/reservations/", include("reservations.urls")),
]

# lockers/urls.py (created)
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'', LockerViewSet, basename='locker')
urlpatterns = router.urls

# reservations/urls.py (created)
router = DefaultRouter()
router.register(r'', ReservationViewSet, basename='reservation')
urlpatterns = router.urls
```

---

## 5. User Registration Failing

### Problem
- Registration returned "Registration failed" error
- Password not properly hashed
- `create_user` method received incorrect parameters

### Solution
```python
# authentication/serializers.py
def create(self, validated_data):
    validated_data.pop("password2")
    password = validated_data.pop("password")  # Extract password first
    user = User.objects.create_user(password=password, **validated_data)
    return user
```
- Separated password from other fields
- Used `create_user` method which handles password hashing

---

## 6. PostgreSQL Command Not Found

### Problem
```
psql : The term 'psql' is not recognized
```
- PostgreSQL bin directory not in system PATH
- Could not run psql commands from terminal

### Solution
- Created manual setup guide (`setup_db_manual.md`)
- Instructed to use SQL Shell (psql) from Start Menu
- Provided step-by-step SQL commands to run manually

---

## 7. UI Theme Inconsistency

### Problem
- Login page had dark slate theme
- Register, Dashboard, Lockers, and Reservations pages had light theme
- Inconsistent user experience

### Solution
Applied consistent dark slate theme across all pages:
```jsx
// Background with animations
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-96 h-96 bg-slate-700/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
    <div className="absolute w-96 h-96 bg-slate-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-slate-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
  </div>
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
</div>

// Cards with backdrop blur
<div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50">
```

---

## 8. Locker Status Not Updating After Cancellation

### Problem
- When user canceled reservation, locker remained "reserved" in database
- Locker page showed incorrect status
- Had to manually update locker status

### Solution
```python
# reservations/views.py
def perform_destroy(self, instance):
    locker = instance.locker
    locker.status = "available"  # Update status
    locker.save()
    instance.delete()
```
- Added `perform_destroy` method to automatically update locker status
- Ensures data consistency between reservations and lockers

---

## 9. Empty Locker Database

### Problem
- No sample data to test reservation functionality
- Had to manually create lockers through admin panel

### Solution
Created automated script:
```python
# add_lockers.py
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locker_system.settings')
django.setup()

from lockers.models import Locker

lockers_data = [
    {'locker_number': '101', 'location': 'Building A - Floor 1', 'status': 'available'},
    # ... more lockers
]

for locker_data in lockers_data:
    Locker.objects.get_or_create(
        locker_number=locker_data['locker_number'],
        defaults={'location': locker_data['location'], 'status': locker_data['status']}
    )
```
Run: `python add_lockers.py`

---

## 10. Missing Dependencies

### Problem
```
ModuleNotFoundError: No module named 'rest_framework'
ModuleNotFoundError: No module named 'corsheaders'
```
- Required packages not installed in virtual environment

### Solution
```bash
pip install -r requirements.txt
```

Ensured `requirements.txt` included:
```
Django==5.2.7
djangorestframework==3.15.2
djangorestframework-simplejwt==5.3.0
django-cors-headers==4.4.0
python-dotenv==1.0.0
psycopg2-binary==2.9.9
```

---

## 11. JWT Configuration Missing

### Problem
- JWT authentication not working
- No token lifetime settings
- REST Framework authentication not configured

### Solution
```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

---

## 12. Environment Variables Not Loading

### Problem
- Secret key and database credentials hardcoded
- `.env` file not being read
- Security risk with exposed credentials

### Solution
```python
# settings.py
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY', 'default-key')
DEBUG = os.getenv('DEBUG', 'True') == 'True'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv('DB_NAME', 'locker_db'),
        "USER": os.getenv('DB_USER', 'locker_user'),
        "PASSWORD": os.getenv('DB_PASSWORD', ''),
        "HOST": os.getenv('DB_HOST', 'localhost'),
        "PORT": os.getenv('DB_PORT', '5432'),
    }
}
```

---

## Summary of Key Learnings

1. **Always configure custom user model before first migration**
2. **Use environment variables for sensitive data**
3. **Configure CORS properly for frontend-backend communication**
4. **Use ViewSets with routers for cleaner API structure**
5. **Override perform_destroy/perform_create for business logic**
6. **Maintain consistent UI theme across all pages**
7. **Create seed data scripts for testing**
8. **Document setup process for team members**

---

## Prevention Checklist

For future projects:
- [ ] Configure database and user model first
- [ ] Set up environment variables early
- [ ] Install all required packages in requirements.txt
- [ ] Configure CORS before frontend integration
- [ ] Create URL patterns for all apps
- [ ] Add seed data scripts
- [ ] Maintain consistent UI theme from start
- [ ] Test API endpoints before frontend integration
- [ ] Document problems and solutions as they occur

---

## Tools Used for Debugging

1. **Django Debug Toolbar** - SQL query analysis
2. **Browser DevTools** - Network tab for API calls
3. **Postman** - API endpoint testing
4. **PostgreSQL pgAdmin** - Database inspection
5. **Django Shell** - Model testing
6. **Console Logs** - Frontend debugging

---

## Conclusion

All major issues were resolved through:
- Proper configuration management
- Following Django best practices
- Consistent error handling
- Comprehensive testing
- Clear documentation

The system is now fully functional with proper authentication, locker management, and reservation workflows.
