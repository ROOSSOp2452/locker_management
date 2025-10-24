# Smart Storage Lockers - Workflow Guide

## System Overview
A full-stack locker management system with user authentication, locker browsing, and reservation management.

## Tech Stack
- **Backend**: Django 5.2.7 + Django REST Framework + PostgreSQL
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)

---

## Setup Workflow

### 1. Backend Setup

#### Install PostgreSQL
Download from: https://www.postgresql.org/download/

#### Create Database
Open SQL Shell (psql) and run:
```sql
CREATE DATABASE locker_db;
CREATE USER locker_user WITH PASSWORD '!123,Abc';
GRANT ALL PRIVILEGES ON DATABASE locker_db TO locker_user;
\c locker_db
GRANT ALL ON SCHEMA public TO locker_user;
\q
```

#### Install Dependencies
```bash
cd locker-management
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

#### Run Migrations
```bash
cd locker_system
python manage.py makemigrations
python manage.py migrate
```

#### Create Admin User
```bash
python manage.py createsuperuser
```

#### Add Sample Lockers
```bash
cd ..
python add_lockers.py
```

#### Start Backend Server
```bash
cd locker_system
python manage.py runserver
```
Backend runs on: http://localhost:8000

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## User Workflow

### 1. Registration
- Navigate to http://localhost:5173/register
- Fill in: Username, Email, Password (min 8 chars, 1 uppercase, 1 digit)
- Click "Create Account"
- Redirected to Login page

### 2. Login
- Navigate to http://localhost:5173/login
- Enter Username and Password
- Click "Sign In"
- Redirected to Dashboard

### 3. Dashboard
- View system statistics:
  - Total Lockers
  - Available Lockers
  - Active Reservations
- See occupancy overview
- View recent activity
- Access quick actions

### 4. Browse Lockers
- Click "Lockers" in navigation
- View all available lockers with:
  - Locker number
  - Location
  - Status (Available/Reserved/Maintenance)
- Click "Reserve Now" on available lockers

### 5. Make Reservation
- Click "Reserve Now" on any available locker
- Locker status changes to "Reserved"
- Reservation appears in "My Reservations"

### 6. View Reservations
- Click "Reservations" in navigation
- See all your active reservations with:
  - Locker number and location
  - Reserved until date/time
  - Status indicator

### 7. Cancel Reservation
- Go to "My Reservations"
- Click "Cancel Reservation" on any active reservation
- Locker becomes available again
- Reservation removed from list

### 8. Logout
- Click user icon in navigation
- Click "Logout"
- Redirected to Login page

---

## Admin Workflow

### Admin Access
- Login with superuser credentials
- Access Django Admin: http://localhost:8000/admin

### Admin Capabilities
- Create/Edit/Delete lockers
- View all reservations (all users)
- Manage user accounts
- Change locker status (Available/Reserved/Maintenance)

---

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (returns JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user profile

### Lockers
- `GET /api/lockers/` - List all lockers
- `POST /api/lockers/` - Create locker (admin only)
- `GET /api/lockers/{id}/` - Get locker details
- `PUT /api/lockers/{id}/` - Update locker (admin only)
- `DELETE /api/lockers/{id}/` - Delete locker (admin only)

### Reservations
- `GET /api/reservations/` - List user's reservations
- `POST /api/reservations/` - Create reservation
- `GET /api/reservations/{id}/` - Get reservation details
- `DELETE /api/reservations/{id}/` - Cancel reservation

---

## Database Schema

### Users Table
- id, username, email, password (hashed)
- first_name, last_name, role (user/admin)
- created_at, updated_at

### Lockers Table
- id, locker_number, location
- status (available/reserved/maintenance)
- created_at, updated_at

### Reservations Table
- id, user_id (FK), locker_id (FK)
- reserved_until, is_active
- created_at, updated_at

---

## Key Features

### Security
- JWT token authentication
- Password validation (min 8 chars, uppercase, digit)
- CORS protection
- Environment-based configuration

### UI/UX
- Dark slate theme with animated backgrounds
- Responsive design (mobile/tablet/desktop)
- Real-time status updates
- Loading states and error handling

### Business Logic
- Automatic locker status updates on reservation/cancellation
- User can only see their own reservations
- Admin can view all reservations
- Prevent double-booking of lockers

---

## Troubleshooting

### Backend Issues
- **Database connection error**: Check PostgreSQL is running and credentials in `.env`
- **Migration errors**: Run `python manage.py migrate --run-syncdb`
- **Port 8000 in use**: Change port with `python manage.py runserver 8001`

### Frontend Issues
- **API connection error**: Ensure backend is running on port 8000
- **CORS errors**: Check CORS settings in Django settings.py
- **Port 5173 in use**: Vite will automatically use next available port

### Common Errors
- **404 on API calls**: Check URL patterns in Django urls.py
- **401 Unauthorized**: Token expired, login again
- **Registration failed**: Check password requirements

---

## Development Tips

### Adding New Lockers
```bash
python add_lockers.py
```

### Reset Database
```bash
python manage.py flush
python manage.py migrate
python manage.py createsuperuser
python add_lockers.py
```

### View Logs
- Backend: Check terminal running Django server
- Frontend: Check browser console (F12)

---

## Project Structure

```
Smart Storage Lockers/
├── locker-management/          # Backend
│   ├── locker_system/          # Django project
│   │   ├── settings.py         # Configuration
│   │   ├── urls.py             # URL routing
│   │   └── .env                # Environment variables
│   ├── authentication/         # Auth app
│   ├── lockers/                # Lockers app
│   ├── reservations/           # Reservations app
│   ├── add_lockers.py          # Sample data script
│   └── requirements.txt        # Python dependencies
└── frontend/                   # Frontend
    ├── src/
    │   ├── pages/              # React pages
    │   ├── components/         # Reusable components
    │   ├── context/            # Auth context
    │   └── api/                # API client
    └── package.json            # Node dependencies
```

---

## Next Steps

1. ✅ Setup backend and database
2. ✅ Setup frontend
3. ✅ Register user account
4. ✅ Login and explore dashboard
5. ✅ Browse and reserve lockers
6. ✅ Manage reservations

