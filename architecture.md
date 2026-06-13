# architecture.md

## Project architecture

OSBT Student Success Hub is a simple full-stack web project.

The frontend is built with HTML, CSS, and JavaScript.
The backend is built with Node.js and Express.
Data is stored first in JSON files.

---

## System flow

User interacts with the website pages.

Frontend sends requests using fetch().

Backend receives the request through Express API routes.

Backend reads or writes JSON files.

Backend sends JSON response back to the frontend.

Frontend updates the UI.

Simple flow:

User → Frontend → fetch() → Backend API → JSON files → Backend response → Frontend UI

---

## Frontend structure

Frontend files are inside the public folder.

Pages:

* index.html — homepage and floating FAQ widget
* events.html — shows school events
* request.html — student request form
* admin.html — basic admin dashboard

CSS:

* css/style.css — main design, layout, responsive styling

JavaScript:

* js/main.js — shared frontend logic
* js/faq-widget.js — floating FAQ widget logic
* js/events.js — load and display events
* js/request.js — submit student requests
* js/admin.js — admin dashboard logic

---

## Backend structure

## Admin page direction

The admin page should not stay only a preview dashboard.

It should include:

* Dashboard summary section
* Manage Requests section: show all requests and allow pending/done status updates later
* Manage Events section: allow admin to add new events later, and delete events only if time allows

Current priority remains fixing and completing POST /api/requests with validation before these admin features.

---

Backend file:

* server.js

Backend responsibilities:

* Serve static frontend files
* Create API routes
* Validate user input
* Read JSON data
* Write JSON data
* Return clear JSON responses

---

## API routes

Events:

* GET /api/events — get all events
* POST /api/events — add new event

Requests:

* GET /api/requests — get all student requests
* GET /api/requests/:id — get one student request by id
* POST /api/requests — create new student request
* PATCH /api/requests/:id/status — update request status

Note:
GET /api/requests/:id is optional for MVP. It can be used later if the admin dashboard has a “View details” feature.

FAQ:

* GET /api/faqs — get FAQ categories, questions, and answers

---

## Data files

Data is stored inside the data folder.

* data/events.json
* data/requests.json
* data/faqs.json

---

## Data models

Event example:

{
"id": 1,
"title": "AI Workshop",
"date": "2026-06-20",
"category": "Workshop",
"description": "Introduction to AI tools for students"
}

Request example:

{
"id": 1,
"fullName": "Student Name",
"email": "[student@email.com](mailto:student@email.com)",
"category": "Orientation",
"message": "I need help choosing a program",
"status": "pending",
"createdAt": "2026-06-10"
}

FAQ example:

{
"id": "admissions",
"title": "Admissions",
"questions": [
{
"question": "How can I apply?",
"answer": "You can contact the admission office or use the official OSBT contact channels."
}
]
}

---

## Important rule

The frontend does not write directly to JSON files.

The frontend talks to the backend using fetch().

The backend is responsible for reading and writing data.
