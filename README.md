# Student Success Hub

Student Success Hub is a student support web application for OSBT students and candidates. It helps students log in, view school events, submit support requests, and gives admins a dashboard to manage events and requests.

## Technologies Used

- HTML
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express.js
- SQLite

## Features

- Student login/register
- Student request submission
- Events page
- Admin dashboard
- Role-based access with `student` and `admin`
- Events CRUD
- Requests management
- Session-based authentication

## CRUD Explanation

### Events

Events are the main full CRUD resource in the admin dashboard.

- Create: admin can add a new event.
- Read: public users can view events on the Events page, and admins can list events in the dashboard.
- Update: admin can edit event title, category, date, and description.
- Delete: admin can delete events.

### Requests

Requests are used for student support.

- Create: students can submit a request from the request page.
- Read: admins can view submitted requests in the dashboard.
- Update status: admins can mark requests as `pending` or `done`.

## School Requirement Coverage

This project satisfies the school requirement in two parts:

- Frontend website: uses HTML, CSS, Bootstrap, and JavaScript.
- Backend CRUD app: uses Node.js and Express.js for API routes.
- Admin dashboard: acts as the CRUD management area for events and requests.

Bootstrap is used lightly through CDN classes such as `form-control`, `form-select`, `btn`, and `table`, while the custom CSS keeps the main OSBT visual identity.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
copy .env.example .env
```

3. Update `.env` with your local admin and session values.

4. Start the server:

```bash
npm start
```

5. Open the app:

```text
http://localhost:3000
```

Useful pages:

- Login: `http://localhost:3000/login.html`
- Register: `http://localhost:3000/register.html`
- Home: `http://localhost:3000/index.html`
- Events: `http://localhost:3000/events.html`
- Request form: `http://localhost:3000/request.html`
- Admin dashboard: `http://localhost:3000/admin.html`

## Important Git Notes

The following files should not be pushed to GitHub:

- `.env`
- `data/app.db`
- `ai-context.md`

The `.env` file contains secrets, `data/app.db` is the local SQLite database file, and `ai-context.md` is local AI/project context.

## Main API Routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register a student account |
| `POST` | `/api/auth/login` | Public | Login student/admin |
| `POST` | `/api/auth/logout` | Logged in | Logout |
| `GET` | `/api/auth/me` | Logged in | Get current session user |
| `GET` | `/api/events` | Public | Read/list events |
| `POST` | `/api/events` | Admin | Create event |
| `PATCH` | `/api/events/:id` | Admin | Update event |
| `DELETE` | `/api/events/:id` | Admin | Delete event |
| `POST` | `/api/requests` | Student/Public form | Create support request |
| `GET` | `/api/requests` | Admin | Read/list requests |
| `PATCH` | `/api/requests/:id/status` | Admin | Update request status |

## Future Improvements

- Move events and requests fully from JSON storage to SQLite.
- Add search and filters in the admin dashboard.
- Add a future student community page where students can publish posts.
- Allow students to ask for help, share opportunities, and communicate with each other.
- Add student groups by topic or program, such as internships, exams, programming, business, and events.
- Add comments or replies on posts.
- Add a simple chat or discussion system later.
- Add admin moderation for posts, groups, and inappropriate content.
- Add a report system so students can report bad posts.
- Add automated tests.
- Add charts or CSV export later.
- Add advanced AI/RAG features later.

These community features are future ideas only and are not part of the current implemented version.
