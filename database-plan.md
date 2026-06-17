# Database Plan - OSBT Student Success Hub

## Goal
Move from JSON files to SQLite database and add user authentication with roles.

## Database choice
SQLite for this version.

Reason:
SQLite is fast, simple, local, and good for a school MVP. The project can later be upgraded to MySQL.

## User roles
- student
- admin

## Security decisions
- Users register as student only.
- Admin users are created manually or seeded from environment variables.
- Passwords must be hashed.
- Admin access must be protected in the backend, not only hidden in the navbar.

## Tables

### users
- id
- full_name
- email
- password_hash
- role
- created_at

### events
- id
- title
- category
- date
- description
- created_at

### requests
- id
- user_id
- full_name
- email
- student_type
- category
- message
- status
- created_at

### faqs
- id
- category
- question
- answer
- created_at

## Auth flow

### Register
- User enters full name, email, password
- Backend hashes password
- User is saved with role = student

### Login
- User enters email and password
- Backend checks password hash
- Session is created
- Backend returns user info including role

### Navbar behavior
- If not logged in: show Login / Register
- If logged in as student: show Home, Events, Requests, Logout
- If logged in as admin: show Home, Events, Requests, Admin, Logout

### Admin protection
- Admin button is shown only for admin users
- /admin.html must check current session
- Admin API routes must require role = admin

## Public vs private routes

### Public
- login page
- register page

### Logged-in users
- home
- events
- request form

### Admin only
- admin dashboard
- manage requests
- add/delete events

## Later features
- student posts
- comments
- groups
- admin moderation
- report system