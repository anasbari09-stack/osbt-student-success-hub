const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");

function showLoginMessage(message, type) {
  loginMessage.classList.remove("success", "error", "loading");
  loginMessage.classList.add(type);
  loginMessage.innerHTML = `<p>${message}</p>`;
}

async function submitLogin(event) {
  event.preventDefault();

  const username = loginForm.elements.username.value.trim();
  const password = loginForm.elements.password.value;

  loginButton.disabled = true;
  loginButton.textContent = "Logging in...";
  showLoginMessage("Checking login...", "loading");

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed.");
    }

    window.location.href = "/admin.html";
  } catch (error) {
    showLoginMessage(error.message, "error");
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", submitLogin);
}
