# Smart Storage Lockers 🔐

A modern, full-stack web application for managing smart storage lockers with secure authentication, real-time status tracking, and intuitive reservation management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![Django](https://img.shields.io/badge/django-5.2.7-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-latest-blue.svg)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based authentication with password strength validation
- 🗄️ **Locker Browsing** - View all available lockers with real-time status updates
- 📅 **Easy Reservations** - One-click locker reservation system
- 📊 **Dashboard** - Comprehensive overview of system statistics and activity
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Modern UI** - Dark slate theme with smooth animations

### Admin Features
- 👥 **User Management** - Manage user accounts and permissions
- 🔧 **Locker Management** - Create, update, and delete lockers
- 📈 **System Monitoring** - View all reservations and system activity
- 🛠️ **Maintenance Mode** - Mark lockers for maintenance

### Technical Features
- ⚡ **Fast Performance** - Optimized API calls and lazy loading
- 🔒 **Security First** - Environment-based config, CORS protection, input validation
- 🔄 **Real-time Updates** - Automatic status synchronization
- 📝 **Comprehensive Logging** - Track all system activities

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5.2.7
- **API**: Django REST Framework 3.15.2
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL
- **CORS**: django-cors-headers
- **Environment**: python-dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📸 Screenshots

### Login Page
Dark slate theme with animated background and secure authentication.

### Dashboard
Comprehensive overview with statistics, occupancy charts, and recent activity.

### Locker List
Browse available lockers with real-time status indicators.

### Reservations
Manage your active reservations with one-click cancellation.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- PostgreSQL 12+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/smart-storage-lockers.git
cd smart-storage-lockers
```

### 2. Backend Setup

#### Install PostgreSQL and Create Database
```sql
CREATE DATABASE locker_db;
CREATE USER locker_user WITH PASSWORD '!123,Abc';
GRANT ALL PRIVILEGES ON DATABASE locker_db TO locker_user;
\c locker_db
GRANT ALL ON SCHEMA public TO locker_user;
```

#### Setup Django
```bash
cd locker-management
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
cd locker_system
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
cd ..
python add_lockers.py  # Add sample data
cd locker_system
python manage.py runserver
```

Backend runs on: **http://localhost:8000**

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## 📚 Documentation

- **[WORKFLOW.md](WORKFLOW.md)** - Complete user and admin workflow guide
- **[PROBLEMS_AND_SOLUTIONS.md](PROBLEMS_AND_SOLUTIONS.md)** - Development challenges and solutions
- **[SETUP_INSTRUCTIONS.md](locker-management/SETUP_INSTRUCTIONS.md)** - Detailed setup guide

## 📁 Project Structure

```
Smart Storage Lockers/
├── locker-management/              # Django Backend
│   ├── locker_system/              # Main project
│   │   ├── settings.py             # Configuration
│   │   ├── urls.py                 # URL routing
│   │   └── .env                    # Environment variables
│   ├── authentication/             # User authentication app
│   │   ├── models.py               # Custom User model
│   │   ├── serializers.py          # API serializers
│   │   ├── views.py                # API views
│   │   └── urls.py                 # Auth endpoints
│   ├── lockers/                    # Locker management app
│   │   ├── models.py               # Locker model
│   │   ├── serializers.py          # Locker serializers
│   │   ├── views.py                # Locker views
│   │   └── urls.py                 # Locker endpoints
│   ├── reservations/               # Reservation app
│   │   ├── models.py               # Reservation model
│   │   ├── serializers.py          # Reservation serializers
│   │   ├── views.py                # Reservation views
│   │   └── urls.py                 # Reservation endpoints
│   ├── add_lockers.py              # Sample data script
│   └── requirements.txt            # Python dependencies
│
├── frontend/                       # React Frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Dashboard.jsx       # Dashboard page
│   │   │   ├── LockerList.jsx      # Locker listing
│   │   │   └── Reservations.jsx    # User reservations
│   │   ├── components/             # Reusable components
│   │   │   └── Navbar.jsx          # Navigation bar
│   │   ├── context/                # React context
│   │   │   └── AuthContext.jsx     # Authentication context
│   │   ├── api/                    # API configuration
│   │   │   └── axios.js            # Axios instance
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json                # Node dependencies
│   └── tailwind.config.js          # Tailwind configuration
│
├── README.md                       # This file
├── WORKFLOW.md                     # Workflow documentation
└── PROBLEMS_AND_SOLUTIONS.md       # Development issues & fixes
```

## 🔌 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "password2": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### Login
```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Get User Profile
```http
GET /api/auth/me/
Authorization: Bearer {access_token}
```

### Locker Endpoints

#### List All Lockers
```http
GET /api/lockers/
Authorization: Bearer {access_token}
```

#### Create Locker (Admin Only)
```http
POST /api/lockers/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "locker_number": "101",
  "location": "Building A - Floor 1",
  "status": "available"
}
```

### Reservation Endpoints

#### Create Reservation
```http
POST /api/reservations/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "locker": 1,
  "reserved_until": "2025-10-25T12:00:00Z"
}
```

#### Cancel Reservation
```http
DELETE /api/reservations/{id}/
Authorization: Bearer {access_token}
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Validation** - Minimum 8 characters, uppercase, digit required
- **CORS Protection** - Configured for specific origins
- **Environment Variables** - Sensitive data stored in .env
- **SQL Injection Prevention** - Django ORM protection
- **XSS Protection** - React's built-in escaping
- **CSRF Protection** - Django middleware

## 🧪 Testing

### Run Backend Tests
```bash
cd locker-management/locker_system
python manage.py test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify PostgreSQL is running
- Check credentials in `.env` file
- Ensure database exists

**CORS Error**
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Verify frontend URL matches allowed origins

**404 on API Calls**
- Ensure backend server is running on port 8000
- Check URL patterns in Django urls.py

**Registration Failed**
- Verify password meets requirements (8+ chars, uppercase, digit)
- Check backend logs for detailed error

See [PROBLEMS_AND_SOLUTIONS.md](PROBLEMS_AND_SOLUTIONS.md) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- Tailwind CSS community
- PostgreSQL community

## 📞 Support

For support, email support@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Email notifications for reservations
- [ ] QR code generation for locker access
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Locker size variants
- [ ] Automated locker assignment

---

**Made with ❤️ using Django and React**