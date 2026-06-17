# OSBT Student Success Hub - Report Notes

## 1. Project Title

OSBT Student Success Hub

## 2. Project Idea

OSBT Student Success Hub is a modern student helper website for OSBT students and candidates. The idea is to create one simple place where users can find quick guidance, view school events, submit support requests, and access the AI Assistant app when they need more help.

The project is designed as a student support hub, not a copy of the official OSBT website.

## 3. Problem

Students and candidates often need quick answers about admissions, events, orientation, technical issues, or general school support. Without a clear starting point, they may waste time searching for information or not know where to ask their question.

## 4. Target Users

- Current OSBT students who need academic, event, or technical support.
- Candidates who want help with admissions or school information.
- Admin users who need to view requests and manage events.

## 5. Solution

The solution is a clean and easy-to-use web hub that connects important student support actions in one place.

Users can open the homepage, use the FAQ widget for quick answers, check events, submit a request, and go to the AI Assistant app for more help. Admin users can view dashboard information, manage student requests, and add or delete events.

## 6. Main Features

### Home Page

- Modern homepage with OSBT branding.
- Glass-style navigation bar.
- Hero video for a premium school and technology feeling.
- About/value section explaining the purpose of the hub.
- Student support cards that guide users to useful actions.
- Final call-to-action section.

### FAQ Widget

- Floating FAQ widget on the homepage.
- Categories such as admissions, programs, events, and support.
- Users can click a question and see a quick answer.
- Helpful for MVP guidance before adding advanced AI features.

### Events Page with Filters and Details Modal

- Displays events from the backend API.
- Users can filter events by category.
- Each event card shows the date, category, title, and description.
- A "View details" button opens a modal with more event information.
- Includes loading and empty states for a better user experience.

### Student Request Form

- Allows students or candidates to submit a support request.
- Collects full name, email, student type, category, and message.
- Sends the request to the backend API.
- Shows validation errors if required information is missing or invalid.
- Shows a success message when the request is saved.

### Admin Dashboard

- Shows summary numbers for total requests, pending requests, completed requests, and upcoming events.
- Shows recent student requests.
- Shows a preview of upcoming events.
- Gives admins a simple management area instead of only a static dashboard.

### Manage Requests

- Displays submitted requests in a table.
- Shows student name, email, category, message preview, status, and date.
- Admin can change request status between `pending` and `done`.
- Updates are saved through the backend API.

### Add/Delete Events

- Admin can add a new event using a form.
- The event form validates title, date, category, and description.
- New events are saved in JSON storage through the API.
- Admin can delete an event from the manage events section.

## 7. Technical Architecture

### Frontend: HTML/CSS/JS

- HTML is used for page structure.
- CSS is used for the light premium design, responsive layout, navbar, cards, forms, tables, and modals.
- Vanilla JavaScript is used for interactivity, API calls, filtering, modals, form submission, and admin actions.
- No Bootstrap or Tailwind is used.

### Backend: Node.js/Express

- Node.js runs the backend server.
- Express serves static files from the `public/` folder.
- Express also provides API routes for events, requests, FAQs, and health checks.
- The server validates request data before saving it.

### API Routes

- `GET /api/health` checks if the API is running.
- `GET /api/events` returns all events.
- `POST /api/events` adds a new event.
- `DELETE /api/events/:id` deletes an event.
- `GET /api/requests` returns all student requests.
- `POST /api/requests` saves a new student request.
- `PATCH /api/requests/:id/status` updates a request status.
- `GET /api/faqs` returns FAQ data.

### JSON Data Storage

- `data/events.json` stores events.
- `data/requests.json` stores student support requests.
- `data/faqs.json` stores FAQ items.
- JSON storage was chosen because it is simple and good for the MVP phase.

## 8. Demo Flow

1. Open the homepage.
   - Show the OSBT branding, hero video, navigation, support cards, and call-to-action.

2. Use the FAQ widget.
   - Open the floating FAQ widget.
   - Choose a category.
   - Click a question and show the answer.

3. View and filter events.
   - Go to the Events page.
   - Show the event cards loaded from the API.
   - Use category filters.
   - Click "View details" to open the event modal.

4. Submit a request.
   - Go to the Request page.
   - Fill in the student request form.
   - Submit the form.
   - Show the success message or validation errors.

5. Admin marks request done.
   - Go to the Admin page.
   - Show dashboard summary cards.
   - Find a pending request.
   - Click the action button to mark it as done.

6. Admin adds/deletes event.
   - Use the add event form in the Admin page.
   - Add a new event and show the success message.
   - Delete an event from the manage events section.

## 9. What I Learned

- How to organize a small full-stack web project.
- How to connect frontend pages to backend API routes.
- How to use Node.js and Express to serve static files and JSON APIs.
- How to use JSON files as simple MVP data storage.
- How to validate form data on the backend.
- How to update the UI after API actions.
- How to build event filters, modals, form feedback, and admin actions with vanilla JavaScript.
- How to keep the project simple while still making it useful and professional.

## 10. Challenges and Fixes

- Challenge: Making the project useful without adding too many advanced features.
  - Fix: Kept the MVP focused on homepage, FAQ, events, requests, and admin management.

- Challenge: Storing data before using a real database.
  - Fix: Used JSON files for simple storage during the MVP phase.

- Challenge: Handling invalid form input.
  - Fix: Added backend validation and frontend error messages.

- Challenge: Keeping the interface clean and consistent.
  - Fix: Used a light theme, OSBT colors, calm typography, and small hover transitions.

- Challenge: Updating admin data after actions.
  - Fix: Reloaded requests and events after status changes, additions, and deletions.

## 11. Future Improvements

- Add a real login system for admins.
- Replace JSON files with a database.
- Add event editing.
- Add request search and filtering.
- Add charts or visual analytics to the admin dashboard.
- Add CSV export for requests.
- Add multilingual support.
- Add advanced AI or RAG features later.
- Improve accessibility testing.
- Add automated tests for API routes.
