# decisions.md

## Decision 1 - Build a student hub, not a copy of the official website

Reason:
The official school website already gives general public information.
My project will add value by focusing on students and candidates: quick help, events, requests, and easy access to support.

---

## Decision 2 - Use a floating FAQ widget instead of a full chatbot

Reason:
A guided FAQ widget is faster, simpler, and safer for the MVP.
Users can choose categories and repeated questions, then get ready answers immediately.

For advanced questions, the user can click a button to open my full AI Assistant app.

Current scope:
The homepage includes a local-only floating FAQ widget UI. It uses prepared answers in JavaScript and does not call an AI API or backend service.

---

## Decision 3 - Use HTML, CSS, JavaScript, and Node.js

Reason:
These technologies match the project requirements and help me understand frontend, backend, APIs, and full-stack logic.

---

## Decision 4 - Use JSON files first instead of a real database

Reason:
JSON files are simple for the first version.
They help me understand data flow before moving to MySQL or MongoDB later.

---

## Decision 5 - Keep admin login, charts, multilingual UI, and AI API for later

Reason:
These features are useful, but they can make the project too big at the beginning.
The priority is to finish a clean MVP first.

---

## Decision 6 - Build small features one by one

Reason:
Each feature should be small, testable, and easy to understand.
I will not ask AI to generate the whole project at once.

---

## Decision 7 - Use vanilla CSS for styling

Reason:
I will use custom CSS instead of Bootstrap or Tailwind for the MVP.
This helps me understand layout, spacing, responsive design, colors, and premium UI fundamentals.

I may use design inspiration from Pinterest, but I will not copy designs directly.

Current design direction:
The homepage uses a light premium school + technology style with a glass navbar, hero video, soft hero-to-content gradient transition, subtle cards, and small hover transitions.

---

## Decision 8 - Organize FAQ data by categories

Reason:
The FAQ widget will show categories first, then repeated questions, then ready answers.
This makes the widget simple, fast, and easy to extend.

Example structure:

* Category
* Questions
* Answers

---

## Decision 9 - Keep error handling simple but clear

Reason:
The MVP should handle important errors without becoming too complex.

I will handle later when backend/form logic starts:

* Empty form fields
* Invalid email format
* Failed API request
* Missing or empty data
* Clear success/error messages for the user

---

## Decision 10 - Use manual testing for the MVP

Reason:
For this beginner MVP, manual testing is enough.
I will test pages, buttons, forms, API routes, JSON data changes, console errors, and mobile responsiveness.

Unit tests can be added later after the main features work.
