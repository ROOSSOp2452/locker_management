# PostgreSQL Setup Instructions

## 1. Install PostgreSQL
Download and install PostgreSQL from: https://www.postgresql.org/download/

## 2. Create Database and User

### Option A: Using SQL Script
```bash
psql -U postgres -f setup_postgres.sql
```

### Option B: Manual Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Run these commands:
CREATE DATABASE locker_db;
CREATE USER locker_user WITH PASSWORD '!123,Abc';
ALTER ROLE locker_user SET client_encoding TO 'utf8';
ALTER ROLE locker_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE locker_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE locker_db TO locker_user;

# Connect to the database
\c locker_db

# Grant schema privileges
GRANT ALL ON SCHEMA public TO locker_user;
```

## 3. Run Django Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

## 4. Create Superuser
```bash
python manage.py createsuperuser
```

## 5. Start Server
```bash
python manage.py runserver
```
