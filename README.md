# OSBT Student Success Hub

OSBT Student Success Hub is a modern student helper website for OSBT students and candidates. It gives users a simple place to find quick guidance, view events, submit support requests, and access the full AI Assistant app when they need more help.

## Project Overview

This project is built as a lightweight student support hub, not a replacement for the official OSBT website. The current version combines a polished static frontend with a beginner-friendly Node.js and Express backend that serves API data from JSON files.

The homepage uses a clean school-and-technology visual style with the OSBT logo, a hero video, student support cards, a local FAQ widget, and clear navigation to events, requests, admin tools, and the AI Assistant.

## Problem

Students and candidates often need quick answers about admissions, events, orientation, technical issues, or general school support. Without one clear starting point, they may spend extra time looking for information or figuring out where to ask for help.

## Solution

OSBT Student Success Hub provides one simple web experience where users can:

- Read key support information.
- Browse upcoming events.
- Submit a help request.
- Use a local FAQ widget for quick guidance.
- Open the full AI Assistant app when deeper help is needed.
- Give admins a foundation for managing requests and events.

## Features

- Responsive homepage with OSBT branding.
- Glass-style navigation and mobile sidebar.
- Hero video on the homepage.
- About and value section.
- Student support cards.
- Local FAQ widget for MVP guidance.
- Events page connected to JSON-backed API data.
- Request page for student and candidate support requests.
- Admin page foundation for viewing and managing requests and events.
- Request status updates with `pending` and `done` states.
- Event creation and deletion API routes.
- Static files served from the `public/` folder.
- JSON files used as simple MVP storage.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- JSON file storage

## Project Structure

```text
osbt-student-success-hub/
├── data/
│   ├── events.json
│   ├── faqs.json
│   └── requests.json
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   └── osbt-logo.png
│   │   └── videos/
│   │       └── hero-school.mp4
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── admin.js
│   │   ├── events.js
│   │   ├── main.js
│   │   └── request.js
│   ├── admin.html
│   ├── events.html
│   ├── index.html
│   └── request.html
├── ai-context.md
├── architecture.md
├── decisions.md
├── learning-log.md
├── package-lock.json
├── package.json
├── plan.md
└── server.js
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/health` | Checks that the API is running. |
| GET | `/api/events` | Returns all events from `data/events.json`. |
| POST | `/api/events` | Adds a new event after validating title, date, category, and description. |
| DELETE | `/api/events/:id` | Deletes an event by ID. |
| GET | `/api/requests` | Returns all support requests from `data/requests.json`. |
| POST | `/api/requests` | Adds a new support request after validating the form data. |
| PATCH | `/api/requests/:id/status` | Updates a request status to `pending` or `done`. |
| GET | `/api/faqs` | Returns FAQ items from `data/faqs.json`. |

## How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the app in your browser:

```text
http://localhost:3000
```

Useful pages:

- Homepage: `http://localhost:3000/`
- Events: `http://localhost:3000/events.html`
- Request form: `http://localhost:3000/request.html`
- Admin page: `http://localhost:3000/admin.html`

## What I Learned

- How to structure a small full-stack project with a clear frontend and backend.
- How to serve static files with Express.
- How to build simple API routes for events, FAQs, and student requests.
- How to use JSON files as MVP storage before adding a real database.
- How to validate user input on backend routes.
- How to keep a project simple, readable, and beginner-friendly while still making it useful.
- How to document project decisions and future steps clearly.

## Future Improvements

- Add a real admin login system.
- Replace JSON file storage with a database.
- Improve admin tools for adding, editing, filtering, and deleting events.
- Add better request management with search and filters.
- Add charts or dashboard summaries for admins.
- Add CSV export for requests.
- Add multilingual support.
- Connect advanced AI or RAG features later.
- Improve accessibility testing and form feedback.
- Add automated tests for API routes.
