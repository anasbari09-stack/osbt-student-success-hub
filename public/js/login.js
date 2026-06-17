const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");

function showLoginMessage(message, type) {
  loginMessage.classList.remove("success", "error", "loading");
  loginMessage.classList.add(type);
  loginMessage.innerHTML = `<p>${message}</p>`;
}

function translateLoginMessage(message) {
  const messages = {
    "Invalid email or password.": "Email ou mot de passe invalide.",
    "Email is required.": "L'email est obligatoire.",
    "Password is required.": "Le mot de passe est obligatoire."
  };

  return messages[message] || message;
}

function getFirstError(errors) {
  if (!errors) {
    return "";
  }

  return Object.values(errors)[0] || "";
}

async function submitLogin(event) {
  event.preventDefault();

  const email = loginForm.elements.email.value.trim();
  const password = loginForm.elements.password.value;

  loginButton.disabled = true;
  loginButton.textContent = "Connexion...";
  showLoginMessage("Vérification de la connexion...", "loading");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.message || getFirstError(result.errors);
      throw new Error(translateLoginMessage(errorMessage) || "La connexion a échoué.");
    }

    window.location.href = "/index.html";
  } catch (error) {
    showLoginMessage(error.message, "error");
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Se connecter";
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", submitLogin);
}
