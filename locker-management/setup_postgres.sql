-- Run this SQL script in PostgreSQL to create the database and user
-- Connect to PostgreSQL as superuser and run: psql -U postgres -f setup_postgres.sql

CREATE DATABASE locker_db;
CREATE USER locker_user WITH PASSWORD '!123,Abc';
ALTER ROLE locker_user SET client_encoding TO 'utf8';
ALTER ROLE locker_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE locker_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE locker_db TO locker_user;

-- Connect to the database and grant schema privileges
\c locker_db
GRANT ALL ON SCHEMA public TO locker_user;
