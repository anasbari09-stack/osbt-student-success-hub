const eventsList = document.querySelector("#eventsList");
const filterButtons = document.querySelectorAll(".event-filters button");
const eventModal = document.querySelector("#eventModal");
const eventModalClose = document.querySelector("#eventModalClose");
const eventModalTitle = document.querySelector("#eventModalTitle");
const eventModalDate = document.querySelector("#eventModalDate");
const eventModalCategory = document.querySelector("#eventModalCategory");
const eventModalDescription = document.querySelector("#eventModalDescription");
let allEvents = [];

function normalizeCategory(category) {
  return String(category || "")
    .trim()
    .toLowerCase()
    .replace(/s$/, "");
}

function showEventsState(message) {
  eventsList.innerHTML = `
    <article class="events-state">
      <p>${message}</p>
    </article>
  `;
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createEventCard(eventItem) {
  return `
    <article class="event-card">
      <div class="event-card-top">
        <p class="event-date">${escapeHTML(eventItem.date)}</p>
        <span class="event-badge">${escapeHTML(eventItem.category)}</span>
      </div>
      <h2>${escapeHTML(eventItem.title)}</h2>
      <p>${escapeHTML(eventItem.description)}</p>
      <button class="event-detail-button" type="button" data-event-id="${eventItem.id}">View details</button>
    </article>
  `;
}

function renderEvents(events) {
  if (!events.length) {
    showEventsState("No events match this filter right now.");
    return;
  }

  eventsList.innerHTML = events.map(createEventCard).join("");
}

function getFilteredEvents(filterName) {
  const normalizedFilter = normalizeCategory(filterName);

  if (normalizedFilter === "all") {
    return allEvents;
  }

  return allEvents.filter(function (eventItem) {
    return normalizeCategory(eventItem.category) === normalizedFilter;
  });
}

function setActiveFilterButton(activeButton) {
  filterButtons.forEach(function (button) {
    button.classList.remove("is-active");
  });

  activeButton.classList.add("is-active");
}

function handleFilterClick(event) {
  const button = event.currentTarget;
  const filterName = button.textContent;

  setActiveFilterButton(button);
  renderEvents(getFilteredEvents(filterName));
}

function openEventModal(eventItem) {
  eventModalTitle.textContent = eventItem.title;
  eventModalDate.textContent = eventItem.date;
  eventModalCategory.textContent = eventItem.category;
  eventModalDescription.textContent = eventItem.description;
  eventModal.classList.add("is-open");
  eventModal.setAttribute("aria-hidden", "false");
  eventModalClose.focus();
}

function closeEventModal() {
  eventModal.classList.remove("is-open");
  eventModal.setAttribute("aria-hidden", "true");
}

function handleEventDetailsClick(event) {
  const button = event.target.closest(".event-detail-button");

  if (!button) {
    return;
  }

  const eventId = Number(button.dataset.eventId);
  const selectedEvent = allEvents.find(function (eventItem) {
    return Number(eventItem.id) === eventId;
  });

  if (selectedEvent) {
    openEventModal(selectedEvent);
  }
}

function handleModalOutsideClick(event) {
  if (event.target === eventModal) {
    closeEventModal();
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape" && eventModal.classList.contains("is-open")) {
    closeEventModal();
  }
}

async function loadEvents() {
  showEventsState("Loading events...");

  try {
    const response = await fetch("/api/events");

    if (!response.ok) {
      throw new Error("Events request failed.");
    }

    const events = await response.json();
    allEvents = events;
    renderEvents(allEvents);
  } catch (error) {
    showEventsState("Events could not be loaded. Please try again later.");
  }
}

if (eventsList) {
  loadEvents();
  eventsList.addEventListener("click", handleEventDetailsClick);
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", handleFilterClick);
});

if (eventModal && eventModalClose) {
  eventModalClose.addEventListener("click", closeEventModal);
  eventModal.addEventListener("click", handleModalOutsideClick);
  document.addEventListener("keydown", handleEscapeKey);
}
