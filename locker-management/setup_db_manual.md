# Manual PostgreSQL Setup

## Step 1: Open pgAdmin or SQL Shell (psql)
Find "SQL Shell (psql)" in your Start Menu under PostgreSQL

## Step 2: Connect to PostgreSQL
- Server: localhost (press Enter)
- Database: postgres (press Enter)
- Port: 5432 (press Enter)
- Username: postgres (press Enter)
- Password: [Enter your PostgreSQL password]

## Step 3: Run these commands one by one:

```sql
CREATE DATABASE locker_db;
CREATE USER locker_user WITH PASSWORD '!123,Abc';
ALTER ROLE locker_user SET client_encoding TO 'utf8';
ALTER ROLE locker_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE locker_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE locker_db TO locker_user;
\c locker_db
GRANT ALL ON SCHEMA public TO locker_user;
\q
```

## Step 4: Run Django migrations
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
