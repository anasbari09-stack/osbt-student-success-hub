const registerForm = document.querySelector("#registerForm");
const registerButton = document.querySelector("#registerButton");
const registerMessage = document.querySelector("#registerMessage");

function showRegisterMessage(message, type) {
  registerMessage.classList.remove("success", "error", "loading");
  registerMessage.classList.add(type);
  registerMessage.innerHTML = `<p>${message}</p>`;
}

function getFirstError(errors) {
  if (!errors) {
    return "";
  }

  return Object.values(errors)[0] || "";
}

function translateRegisterMessage(message) {
  const messages = {
    "An account with this email already exists.": "Un compte avec cet email existe déjà.",
    "Full name is required.": "Le nom complet est obligatoire.",
    "Email is required.": "L'email est obligatoire.",
    "Valid email is required.": "Un email valide est obligatoire.",
    "Password is required.": "Le mot de passe est obligatoire."
  };

  return messages[message] || message;
}

async function submitRegister(event) {
  event.preventDefault();

  const fullName = registerForm.elements.fullName.value.trim();
  const email = registerForm.elements.email.value.trim();
  const password = registerForm.elements.password.value;
  const confirmPassword = registerForm.elements.confirmPassword.value;

  if (password !== confirmPassword) {
    showRegisterMessage("Les mots de passe ne correspondent pas.", "error");
    return;
  }

  registerButton.disabled = true;
  registerButton.textContent = "Création du compte...";
  showRegisterMessage("Création de votre compte...", "loading");

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        email,
        password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.message || getFirstError(result.errors);
      throw new Error(translateRegisterMessage(errorMessage) || "L'inscription a échoué.");
    }

    showRegisterMessage("Compte créé avec succès.", "success");
    window.location.href = "/index.html";
  } catch (error) {
    showRegisterMessage(error.message, "error");
  } finally {
    registerButton.disabled = false;
    registerButton.textContent = "S'inscrire";
  }
}

if (registerForm) {
  registerForm.addEventListener("submit", submitRegister);
}
