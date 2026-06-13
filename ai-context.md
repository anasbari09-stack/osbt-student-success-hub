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

Final polish - AI Assistant links connected

## Next step

README and presentation preparation

## Planned steps

* Phase 2 Step 2.7 - Admin add events
* Phase 2 Step 2.8 - Optional delete events
