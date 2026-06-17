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

async function checkAdminLogin() {
  const response = await fetch("/api/admin/me");

  if (response.ok) {
    return true;
  }

  const authResponse = await fetch("/api/auth/me");

  if (authResponse.ok) {
    window.location.href = "/index.html";
    return false;
  }

  window.location.href = "/login.html";
  return false;
}

function normalizeStatus(status) {
  return (status || "").toLowerCase();
}

function getStatusLabel(status) {
  return normalizeStatus(status) === "done" ? "Terminé" : "En attente";
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
    return "Aucune date";
  }

  return date.toLocaleDateString("fr-FR", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getShortDate(dateText) {
  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return dateText || "Aucune date";
  }

  return date.toLocaleDateString("fr-FR", {
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

function translateAdminMessage(message) {
  const messages = {
    "Title is required": "Le titre est obligatoire",
    "Date is required": "La date est obligatoire",
    "Category is required": "La catégorie est obligatoire",
    "Description is required": "La description est obligatoire",
    "Status must be pending or done.": "Le statut doit être en attente ou terminé.",
    "Request not found.": "Demande introuvable.",
    "Event not found.": "Événement introuvable.",
    "Could not delete event.": "L'événement n'a pas pu être supprimé.",
    "Event deleted successfully.": "L'événement a été supprimé avec succès."
  };

  return messages[message] || message;
}

function clearEventFieldErrors() {
  Object.values(eventFieldErrors).forEach(function (errorElement) {
    errorElement.textContent = "";
  });
}

function showEventFieldErrors(errors) {
  Object.keys(errors).forEach(function (fieldName) {
    if (eventFieldErrors[fieldName]) {
      eventFieldErrors[fieldName].textContent = translateAdminMessage(errors[fieldName]);
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
    showPreviewRequestsState("Aucune demande n'est disponible pour le moment.");
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
    showManageRequestsState("Aucune demande n'est disponible pour le moment.");
    return;
  }

  manageRequestsBody.innerHTML = requests.map(function (request) {
    const status = normalizeStatus(request.status);
    const statusClass = status === "done" ? "done" : "pending";
    const nextStatus = status === "done" ? "pending" : "done";
    const actionText = status === "done" ? "Marquer en attente" : "Marquer terminé";

    return `
      <tr>
        <td>${escapeHTML(request.fullName)}</td>
        <td>${escapeHTML(request.email || "Aucun email")}</td>
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
    showPreviewEventsState("Aucun événement à venir n'est disponible pour le moment.");
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
    showManageEventsState("Aucun événement n'est disponible pour le moment.");
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
            Supprimer
          </button>
        </div>
      </article>
    `;
  }).join("");
}

async function loadRequests() {
  showPreviewRequestsState("Chargement des demandes...");
  showManageRequestsState("Chargement des demandes...");

  try {
    const response = await fetch("/api/requests");

    if (response.status === 401) {
      window.location.href = "/login.html";
      return;
    }

    if (response.status === 403) {
      window.location.href = "/index.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Les demandes n'ont pas pu être chargées.");
    }

    const requests = await response.json();
    setRequestStats(requests);
    renderPreviewRequests(requests);
    renderManageRequests(requests);
  } catch (error) {
    totalRequestsNumber.textContent = "!";
    pendingRequestsNumber.textContent = "!";
    completedRequestsNumber.textContent = "!";
    showPreviewRequestsState("Les demandes n'ont pas pu être chargées.");
    showManageRequestsState("Les demandes n'ont pas pu être chargées. Veuillez réessayer plus tard.");
  }
}

async function updateRequestStatus(requestId, status) {
  showManageRequestsState("Mise à jour du statut de la demande...");

  try {
    const response = await fetch(`/api/requests/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (response.status === 401) {
      window.location.href = "/login.html";
      return;
    }

    if (response.status === 403) {
      window.location.href = "/index.html";
      return;
    }

    if (!response.ok) {
      throw new Error(translateAdminMessage(result.message) || "Le statut de la demande n'a pas pu être mis à jour.");
    }

    loadRequests();
  } catch (error) {
    showManageRequestsState(error.message);
  }
}

async function loadEvents() {
  showPreviewEventsState("Chargement des événements...");
  showManageEventsState("Chargement des événements...");

  try {
    const response = await fetch("/api/events");

    if (!response.ok) {
      throw new Error("Les événements n'ont pas pu être chargés.");
    }

    const events = await response.json();
    setEventStats(events);
    renderPreviewEvents(events);
    renderManageEvents(events);
  } catch (error) {
    upcomingEventsNumber.textContent = "!";
    showPreviewEventsState("Les événements n'ont pas pu être chargés.");
    showManageEventsState("Les événements n'ont pas pu être chargés. Veuillez réessayer plus tard.");
  }
}

async function submitEvent(event) {
  event.preventDefault();

  const eventData = getEventFormData();

  clearEventFieldErrors();
  addEventButton.disabled = true;
  addEventButton.textContent = "Ajout...";
  showAddEventMessage("Ajout de l'événement...", "loading");

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    });

    const result = await response.json();

    if (response.status === 401) {
      window.location.href = "/login.html";
      return;
    }

    if (response.status === 403) {
      window.location.href = "/index.html";
      return;
    }

    if (!response.ok) {
      if (result.errors) {
        showEventFieldErrors(result.errors);
      }

      throw new Error(translateAdminMessage(result.message) || "Veuillez corriger les champs indiqués.");
    }

    addEventForm.reset();
    clearEventFieldErrors();
    showAddEventMessage("L'événement a été ajouté avec succès.", "success");
    loadEvents();
  } catch (error) {
    showAddEventMessage(error.message, "error");
  } finally {
    addEventButton.disabled = false;
    addEventButton.textContent = "Ajouter l'événement";
  }
}

async function deleteEvent(eventId) {
  const shouldDelete = confirm("Supprimer cet événement ?");

  if (!shouldDelete) {
    return;
  }

  showEventMessage("Suppression de l'événement...", "loading");

  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (response.status === 401) {
      window.location.href = "/login.html";
      return;
    }

    if (!response.ok) {
      throw new Error(translateAdminMessage(result.message) || "L'événement n'a pas pu être supprimé.");
    }

    showEventMessage("L'événement a été supprimé avec succès.", "success");
    loadEvents();
  } catch (error) {
    showEventMessage(error.message, "error");
  }
}

async function initAdminPage() {
  try {
    const isAdmin = await checkAdminLogin();

    if (!isAdmin) {
      return;
    }

    loadRequests();
    loadEvents();
  } catch (error) {
    window.location.href = "/login.html";
  }
}

if (latestRequestsBody && manageRequestsBody && previewEventsList && manageEventsList) {
  initAdminPage();

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
