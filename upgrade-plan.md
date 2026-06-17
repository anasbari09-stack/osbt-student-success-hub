# OSBT Student Success Hub - Upgrade Plan

## Goal
Upgrade the project from a JSON-based MVP to a more professional student platform with authentication, roles, and database storage.

## Current version
- Static frontend
- Node.js + Express backend
- JSON files for events and requests
- Admin dashboard exists
- Simple admin login exists

## Upgrade version
The new version will add:
- Real database, starting with SQLite if time is limited
- User registration
- User login
- Session-based authentication
- User roles: student and admin
- Admin-only dashboard access
- Protected admin API routes
- Navbar changes based on user role

## Recommended database
Use SQLite first.

Reason:
- It is easier than MySQL or PostgreSQL for a beginner project.
- It stores data in one local database file.
- It works well with Node.js and Express.
- It is enough for events, student requests, and users.
- It can be upgraded to MySQL or PostgreSQL later if the project grows.

Do not use MongoDB for this step unless the project specifically needs document-style data. The current data is simple and relational:
- Users
- Roles
- Requests
- Events

## User roles

### Student
Can:
- Login
- View homepage/events
- Submit requests
- Access normal student pages

Cannot:
- See Admin button
- Access admin dashboard
- Modify events or requests

### Admin
Can:
- Login
- See Admin button in navbar
- Access admin dashboard
- View and manage student requests
- Add/delete/manage events

## Later features
- Student community posts
- Comments
- Groups
- Admin moderation
- Report system
- JWT authentication
- More roles such as teacher, moderator, or super admin
- Password reset by email
- Email verification
- Charts and analytics
- CSV export
- Multilingual UI
- Advanced AI/RAG features

## Important decision
The social/community feature will not be built before authentication and database are stable.

The project should use session authentication, not JWT, for this upgrade. Sessions are simpler for a traditional Express app with normal pages and an admin dashboard.

## Security rules
- Passwords must be hashed
- Admin role must be checked on backend, not only hidden in frontend
- Normal users must not access admin routes
- Secrets should stay in .env
- Sessions should use a secret from .env
- The register route should create student accounts only
- Admin accounts should be created manually at first, not through public registration
- Login errors should be simple and not reveal whether the username/email exists

## Suggested database tables

### users
Stores registered users.

Fields:
- id
- fullName
- email
- passwordHash
- role
- createdAt

Allowed roles:
- student
- admin

### requests
Stores student support requests.

Fields:
- id
- userId
- fullName
- email
- category
- message
- status
- createdAt

Note:
When a logged-in student submits a request, the request should be linked to that student with userId.

### events
Stores school events.

Fields:
- id
- title
- date
- category
- description
- createdAt

## Build order

### Step 1 - Add SQLite setup
- Add SQLite package
- Create a database file
- Create tables for users, requests, and events
- Add a small database helper file if needed

### Step 2 - Move data from JSON to database
- Read events from the database instead of data/events.json
- Read and write requests in the database instead of data/requests.json
- Keep the API route names mostly the same

### Step 3 - Add user registration
- Create register page
- Validate full name, email, and password
- Hash passwords before saving
- New public registrations should always create student accounts

### Step 4 - Add login and sessions
- Keep express-session
- Check email and password
- Store only safe user data in the session, such as id, fullName, and role
- Add logout

### Step 5 - Protect routes by role
- Logged-in users can submit requests
- Admin users can access the admin dashboard
- Admin users can manage requests and events
- Backend must check roles before every admin action

### Step 6 - Update frontend behavior
- Show Login/Register when logged out
- Show Logout when logged in
- Show Admin link only for admins
- Do not rely on the frontend for security

## What to build first
Build the database and authentication foundation first:
- SQLite tables
- User registration
- Login/logout sessions
- Role checks

After that, connect requests and events to the database.

## What to delay
Delay anything that is not required for database, login, sessions, and basic roles:
- Social/community features
- JWT
- Complex roles
- Email verification
- Password reset
- Charts
- CSV export
- AI API features
- Large frontend redesign

## Biggest beginner mistakes to avoid
- Building too many features before authentication works
- Hiding admin buttons in the frontend but forgetting backend role checks
- Saving plain text passwords
- Letting users choose their own role during registration
- Replacing all files at once instead of upgrading one route at a time
- Mixing JSON storage and database storage for the same feature for too long
- Adding JWT even though sessions are simpler for this project
- Starting with MySQL/PostgreSQL setup problems before learning the auth flow
- Forgetting to test logged-out, student, and admin behavior separately
