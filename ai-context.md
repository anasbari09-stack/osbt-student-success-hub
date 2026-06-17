# ai-context.md

## Project

OSBT Student Success Hub

A modern student helper website for OSBT students and candidates.

## Goal

Help users:

* Find quick answers
* View events
* Submit requests
* Access the full AI Assistant app when needed

## Tech stack

* HTML
* CSS
* Vanilla JavaScript
* Node.js
* Express
* JSON files for MVP storage

## Current phase

Phase 2 - Backend API foundation

## Current status

* Basic Node/Express setup is done
* Static files are served from public/
* Homepage is visually built with:

  * Glass navbar
  * Hero video
  * About/value section
  * Student support cards
  * Local-only floating FAQ widget UI
  * Final CTA
  * Smooth hero-to-content gradient transition
* Pages exist and have frontend placeholder content:

  * index.html
  * events.html
  * request.html
  * admin.html
* Assets used:

  * assets/images/osbt-logo.png
  * assets/videos/hero-school.mp4

## Main decisions

* Build a student hub, not a copy of the official OSBT website
* Use vanilla CSS, no Bootstrap or Tailwind
* Use light premium theme
* Use OSBT logo and OSBT blue/green identity
* Use hero video only on homepage
* Use a local-only floating FAQ widget on the homepage for MVP guidance
* Use JSON files first, not database
* Keep login, charts, multilingual UI, CSV export, and advanced AI/RAG for later
* Admin page should become a real management area, not only a preview dashboard

## Admin direction

Admin page should include:

* Dashboard summary section
* Manage Requests section: show all requests and allow pending/done status updates later
* Manage Events section: allow adding events later, and delete events only if time allows

## Design direction

* Premium school + technology feeling
* Clean light theme
* Navy blue as the main color
* OSBT green as a small accent
* Rounded glass navbar
* Smooth mobile sidebar
* Calm typography
* Limited colors
* Small hover transitions only
* No big animations yet

## What is forbidden right now

Do not add:

* AI API logic
* Backend API routes
* Form submission logic
* Admin dashboard logic
* Login system
* Database
* Dark/light mode
* Big animations
* Extra libraries

## AI assistant rules

When generating code:

* Work on one small step only
* Do not rewrite the whole project
* Keep code beginner-friendly
* Explain briefly what changed
* Respect existing decisions
* Keep the project simple and testable

## Last completed step

Simple secure admin login added

## Next step

Final security/manual test

## Latest update - Admin login

Admin login was added for the MVP.

What changed:

* Added environment-based admin credentials with `dotenv`
* Added session login with `express-session`
* Added `public/login.html`
* Added `public/js/login.js`
* Added `.env.example`
* Confirmed `.env` is ignored by Git
* Added Logout button to `public/admin.html`
* Added frontend admin session check in `public/js/admin.js`

Protected admin-only routes:

* `GET /api/requests`
* `PATCH /api/requests/:id/status`
* `POST /api/events`
* `DELETE /api/events/:id`

Public routes kept public:

* `GET /api/events`
* `POST /api/requests`
* `GET /api/faqs`

Files changed:

* `server.js`
* `package.json`
* `package-lock.json`
* `.env.example`
* `public/login.html`
* `public/js/login.js`
* `public/admin.html`
* `public/js/admin.js`
* `public/css/style.css`
* `ai-context.md`

Test checklist:

* Visit `/admin.html` while logged out and confirm redirect to `/login.html`
* Try a wrong admin username/password and confirm an error message appears
* Add real values in `.env`, restart the server, and log in successfully
* Confirm `/admin.html` loads requests/events after login
* Confirm Logout redirects to `/login.html`
* Confirm protected admin API routes return `401` when logged out
* Confirm public routes still work while logged out

Next step:

* Final security/manual test

## Planned steps

* Phase 2 Step 2.7 - Admin add events
* Phase 2 Step 2.8 - Optional delete events

## Latest update - SQLite database foundation

SQLite database foundation was added for the auth/database upgrade.

What changed:

* Added `better-sqlite3`
* Added `bcryptjs`
* Added `db/database.js`
* Added startup database initialization in `server.js`
* Added `data/app.db` as the SQLite database file
* Added `.env.example` entries for:

  * `ADMIN_EMAIL`
  * `ADMIN_PASSWORD`
  * `ADMIN_NAME`
  * `SESSION_SECRET`
* Added `data/app.db` to `.gitignore`

Tables created if missing:

* `users`
* `events`
* `requests`
* `faqs`

Admin seed behavior:

* Admin user is seeded from `.env`
* Required values are `ADMIN_EMAIL` and `ADMIN_PASSWORD`
* `ADMIN_NAME` defaults to `School Admin` if missing
* Admin password is hashed with `bcryptjs`
* If `ADMIN_EMAIL` or `ADMIN_PASSWORD` is missing, the app does not crash
* Missing admin seed values log:

  * `Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing.`

Files changed:

* `server.js`
* `package.json`
* `package-lock.json`
* `.env.example`
* `.gitignore`
* `db/database.js`
* `ai-context.md`

Next step:

* Register/login API routes
