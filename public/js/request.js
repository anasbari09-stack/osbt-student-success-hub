const requestForm = document.querySelector("#requestForm");
const requestMessage = document.querySelector("#requestMessage");
const requestSubmitButton = document.querySelector("#requestSubmitButton");
const fieldErrors = {
  fullName: document.querySelector("#fullNameError"),
  email: document.querySelector("#emailError"),
  studentType: document.querySelector("#studentTypeError"),
  category: document.querySelector("#categoryError"),
  message: document.querySelector("#messageError")
};

function showRequestMessage(message, type) {
  requestMessage.classList.remove("success", "error", "loading");
  requestMessage.classList.add(type);
  requestMessage.innerHTML = `<p>${message}</p>`;
}

function translateRequestMessage(message) {
  const messages = {
    "Full name is required": "Le nom complet est obligatoire",
    "Valid email is required": "Un email valide est obligatoire",
    "Student type is required": "Le type d'étudiant est obligatoire",
    "Category is required": "La catégorie est obligatoire",
    "Message is required": "Le message est obligatoire"
  };

  return messages[message] || message;
}

function clearFieldErrors() {
  Object.values(fieldErrors).forEach(function (errorElement) {
    errorElement.textContent = "";
  });
}

function showFieldErrors(errors) {
  Object.keys(errors).forEach(function (fieldName) {
    if (fieldErrors[fieldName]) {
      fieldErrors[fieldName].textContent = translateRequestMessage(errors[fieldName]);
    }
  });
}

function getRequestFormData() {
  return {
    fullName: requestForm.elements["full-name"].value.trim(),
    email: requestForm.elements.email.value.trim(),
    studentType: requestForm.elements["student-type"].value,
    category: requestForm.elements.category.value,
    message: requestForm.elements.message.value.trim()
  };
}

async function submitRequest(event) {
  event.preventDefault();

  const requestData = getRequestFormData();

  clearFieldErrors();
  requestSubmitButton.disabled = true;
  requestSubmitButton.textContent = "Envoi...";
  showRequestMessage("Envoi de votre demande...", "loading");

  try {
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error("Le serveur a retourné une réponse inattendue.");
    }

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        showFieldErrors(result.errors);
      }

      throw new Error(translateRequestMessage(result.message) || "Veuillez corriger les champs indiqués.");
    }

    requestForm.reset();
    clearFieldErrors();
    showRequestMessage("Votre demande a été enregistrée avec succès.", "success");
  } catch (error) {
    showRequestMessage(error.message, "error");
  } finally {
    requestSubmitButton.disabled = false;
    requestSubmitButton.textContent = "Envoyer la demande";
  }
}

if (requestForm) {
  requestForm.addEventListener("submit", submitRequest);
}
