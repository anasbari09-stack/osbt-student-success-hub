const totalRequestsNumber = document.querySelector("#totalRequests");
const pendingRequestsNumber = document.querySelector("#pendingRequests");
const upcomingEventsNumber = document.querySelector("#upcomingEvents");
const completedRequestsNumber = document.querySelector("#completedRequests");
const latestRequestsBody = document.querySelector("#latestRequestsBody");
const manageRequestsBody = document.querySelector("#manageRequestsBody");
const previewEventsList = document.querySelector("#previewEventsList");
const manageEventsList = document.querySelector("#manageEventsList");
const addEventForm = document.querySelector("#addEventForm");
const addEventButton = document.querySelector("#addEventButton");
const addEventMessage = document.querySelector("#addEventMessage");
const eventFieldErrors = {
  title: document.querySelector("#eventTitleError"),
  date: document.querySelector("#eventDateError"),
  category: document.querySelector("#eventCategoryError"),
  description: document.querySelector("#eventDescriptionError")
};

function normalizeStatus(status) {
  return (status || "").toLowerCase();
}

function getStatusLabel(status) {
  return normalizeStatus(status) === "done" ? "Done" : "Pending";
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRequestDate(request) {
  if (request.date) {
    return request.date;
  }

  const date = new Date(request.createdAt);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getShortDate(dateText) {
  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return dateText || "No date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function getRequestTime(request) {
  const date = new Date(request.createdAt || request.date);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getEventTime(eventItem) {
  const date = new Date(eventItem.date);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getMessagePreview(message) {
  const cleanMessage = String(message || "");

  if (cleanMessage.length <= 70) {
    return cleanMessage;
  }

  return `${cleanMessage.slice(0, 70)}...`;
}

function showPreviewRequestsState(message) {
  latestRequestsBody.innerHTML = `
    <tr>
      <td colspan="4">${message}</td>
    </tr>
  `;
}

function showManageRequestsState(message) {
  manageRequestsBody.innerHTML = `
    <tr>
      <td colspan="7">${message}</td>
    </tr>
  `;
}

function showPreviewEventsState(message) {
  previewEventsList.innerHTML = `
    <article class="admin-state">
      <p>${message}</p>
    </article>
  `;
}

function showManageEventsState(message) {
  manageEventsList.innerHTML = `
    <article class="admin-state">
      <p>${message}</p>
    </article>
  `;
}

function showAddEventMessage(message, type) {
  addEventMessage.classList.remove("success", "error", "loading");
  addEventMessage.classList.add(type);
  addEventMessage.innerHTML = `<p>${message}</p>`;
}

function showEventMessage(message, type) {
  if (!addEventMessage) {
    return;
  }

  showAddEventMessage(message, type);
}

function clearEventFieldErrors() {
  Object.values(eventFieldErrors).forEach(function (errorElement) {
    errorElement.textContent = "";
  });
}

function showEventFieldErrors(errors) {
  Object.keys(errors).forEach(function (fieldName) {
    if (eventFieldErrors[fieldName]) {
      eventFieldErrors[fieldName].textContent = errors[fieldName];
    }
  });
}

function getEventFormData() {
  return {
    title: addEventForm.elements.title.value.trim(),
    date: addEventForm.elements.date.value,
    category: addEventForm.elements.category.value,
    description: addEventForm.elements.description.value.trim()
  };
}

function setRequestStats(requests) {
  const pendingRequests = requests.filter(function (request) {
    return normalizeStatus(request.status) === "pending";
  });

  const completedRequests = requests.filter(function (request) {
    return normalizeStatus(request.status) === "done";
  });

  totalRequestsNumber.textContent = requests.length;
  pendingRequestsNumber.textContent = pendingRequests.length;
  completedRequestsNumber.textContent = completedRequests.length;
}

function renderPreviewRequests(requests) {
  if (!requests.length) {
    showPreviewRequestsState("No requests are available right now.");
    return;
  }

  const latestRequests = requests
    .slice()
    .sort(function (firstRequest, secondRequest) {
      return getRequestTime(secondRequest) - getRequestTime(firstRequest);
    })
    .slice(0, 4);

  latestRequestsBody.innerHTML = latestRequests.map(function (request) {
    const statusClass = normalizeStatus(request.status) === "done" ? "done" : "pending";

    return `
      <tr>
        <td>${escapeHTML(request.fullName)}</td>
        <td>${escapeHTML(request.category)}</td>
        <td><span class="status-pill ${statusClass}">${getStatusLabel(request.status)}</span></td>
        <td>${escapeHTML(getRequestDate(request))}</td>
      </tr>
    `;
  }).join("");
}

function renderManageRequests(requests) {
  if (!requests.length) {
    showManageRequestsState("No requests are available right now.");
    return;
  }

  manageRequestsBody.innerHTML = requests.map(function (request) {
    const status = normalizeStatus(request.status);
    const statusClass = status === "done" ? "done" : "pending";
    const nextStatus = status === "done" ? "pending" : "done";
    const actionText = status === "done" ? "Mark Pending" : "Mark Done";

    return `
      <tr>
        <td>${escapeHTML(request.fullName)}</td>
        <td>${escapeHTML(request.email || "No email")}</td>
        <td>${escapeHTML(request.category)}</td>
        <td class="message-preview">${escapeHTML(getMessagePreview(request.message))}</td>
        <td><span class="status-pill ${statusClass}">${getStatusLabel(request.status)}</span></td>
        <td>${escapeHTML(getRequestDate(request))}</td>
        <td>
          <button class="admin-action-button" type="button" data-id="${request.id}" data-status="${nextStatus}">
            ${actionText}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function setEventStats(events) {
  upcomingEventsNumber.textContent = events.length;
}

function renderPreviewEvents(events) {
  if (!events.length) {
    showPreviewEventsState("No upcoming events are available right now.");
    return;
  }

  const upcomingEvents = events
    .slice()
    .sort(function (firstEvent, secondEvent) {
      return getEventTime(firstEvent) - getEventTime(secondEvent);
    })
    .slice(0, 3);

  previewEventsList.innerHTML = upcomingEvents.map(function (eventItem) {
    return `
      <article class="admin-event-row">
        <span>${escapeHTML(getShortDate(eventItem.date))}</span>
        <div>
          <h3>${escapeHTML(eventItem.title)}</h3>
          <p>${escapeHTML(eventItem.category)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderManageEvents(events) {
  if (!events.length) {
    showManageEventsState("No events are available right now.");
    return;
  }

  manageEventsList.innerHTML = events.map(function (eventItem) {
    return `
      <article class="admin-event-row admin-event-manage-card">
        <span>${escapeHTML(getShortDate(eventItem.date))}</span>
        <div>
          <p class="admin-event-category">${escapeHTML(eventItem.category)}</p>
          <h3>${escapeHTML(eventItem.title)}</h3>
          <p>${escapeHTML(eventItem.description)}</p>
          <button class="admin-delete-button" type="button" data-event-id="${eventItem.id}">
            Delete
          </button>
        </div>
      </article>
    `;
  }).join("");
}

async function loadRequests() {
  showPreviewRequestsState("Loading requests...");
  showManageRequestsState("Loading requests...");

  try {
    const response = await fetch("/api/requests");

    if (!response.ok) {
      throw new Error("Requests could not be loaded.");
    }

    const requests = await response.json();
    setRequestStats(requests);
    renderPreviewRequests(requests);
    renderManageRequests(requests);
  } catch (error) {
    totalRequestsNumber.textContent = "!";
    pendingRequestsNumber.textContent = "!";
    completedRequestsNumber.textContent = "!";
    showPreviewRequestsState("Requests could not be loaded.");
    showManageRequestsState("Requests could not be loaded. Please try again later.");
  }
}

async function updateRequestStatus(requestId, status) {
  showManageRequestsState("Updating request status...");

  try {
    const response = await fetch(`/api/requests/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Request status could not be updated.");
    }

    loadRequests();
  } catch (error) {
    showManageRequestsState(error.message);
  }
}

async function loadEvents() {
  showPreviewEventsState("Loading events...");
  showManageEventsState("Loading events...");

  try {
    const response = await fetch("/api/events");

    if (!response.ok) {
      throw new Error("Events could not be loaded.");
    }

    const events = await response.json();
    setEventStats(events);
    renderPreviewEvents(events);
    renderManageEvents(events);
  } catch (error) {
    upcomingEventsNumber.textContent = "!";
    showPreviewEventsState("Events could not be loaded.");
    showManageEventsState("Events could not be loaded. Please try again later.");
  }
}

async function submitEvent(event) {
  event.preventDefault();

  const eventData = getEventFormData();

  clearEventFieldErrors();
  addEventButton.disabled = true;
  addEventButton.textContent = "Adding...";
  showAddEventMessage("Adding event...", "loading");

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        showEventFieldErrors(result.errors);
      }

      throw new Error(result.message || "Please fix the highlighted fields.");
    }

    addEventForm.reset();
    clearEventFieldErrors();
    showAddEventMessage("Event was added successfully.", "success");
    loadEvents();
  } catch (error) {
    showAddEventMessage(error.message, "error");
  } finally {
    addEventButton.disabled = false;
    addEventButton.textContent = "Add Event";
  }
}

async function deleteEvent(eventId) {
  const shouldDelete = confirm("Delete this event?");

  if (!shouldDelete) {
    return;
  }

  showEventMessage("Deleting event...", "loading");

  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Event could not be deleted.");
    }

    showEventMessage("Event was deleted successfully.", "success");
    loadEvents();
  } catch (error) {
    showEventMessage(error.message, "error");
  }
}

if (latestRequestsBody && manageRequestsBody && previewEventsList && manageEventsList) {
  loadRequests();
  loadEvents();

  manageRequestsBody.addEventListener("click", function (event) {
    const button = event.target.closest(".admin-action-button");

    if (!button) {
      return;
    }

    updateRequestStatus(Number(button.dataset.id), button.dataset.status);
  });

  manageEventsList.addEventListener("click", function (event) {
    const button = event.target.closest(".admin-delete-button");

    if (!button) {
      return;
    }

    deleteEvent(Number(button.dataset.eventId));
  });
}

if (addEventForm) {
  addEventForm.addEventListener("submit", submitEvent);
}
