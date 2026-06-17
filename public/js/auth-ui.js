const currentPath = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
const protectedPages = ["/index.html", "/events.html", "/request.html", "/admin.html"];
const publicAuthPages = ["/login.html", "/register.html"];
let currentUser = null;

function isProtectedPage() {
  return protectedPages.includes(currentPath);
}

function isPublicAuthPage() {
  return publicAuthPages.includes(currentPath);
}

function showLoggedInUser(user) {
  document.querySelectorAll(".js-user-name").forEach(function (element) {
    element.textContent = user.fullName;
    element.removeAttribute("hidden");
  });
}

function showLogoutButtons() {
  document.querySelectorAll(".js-logout-button").forEach(function (button) {
    button.removeAttribute("hidden");
  });
}

function updateAdminLinks(user) {
  document.querySelectorAll(".js-admin-link").forEach(function (link) {
    if (user.role === "admin") {
      link.removeAttribute("hidden");
    } else {
      link.setAttribute("hidden", "");
    }
  });
}

async function logoutUser() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST"
    });
  } finally {
    window.location.href = "/login.html";
  }
}

function setupLogoutButtons() {
  document.querySelectorAll(".js-logout-button").forEach(function (button) {
    button.addEventListener("click", logoutUser);
  });
}

function redirectToLogin() {
  window.location.href = "/login.html";
}

async function loadCurrentUser() {
  try {
    const response = await fetch("/api/auth/me");

    if (!response.ok) {
      if (isProtectedPage()) {
        redirectToLogin();
      }

      return;
    }

    const result = await response.json();
    currentUser = result.user;

    if (currentPath === "/admin.html" && currentUser.role !== "admin") {
      window.location.href = "/index.html";
      return;
    }

    if (isPublicAuthPage()) {
      window.location.href = "/index.html";
      return;
    }

    showLoggedInUser(currentUser);
    showLogoutButtons();
    updateAdminLinks(currentUser);
  } catch (error) {
    if (isProtectedPage()) {
      redirectToLogin();
    }
  }
}

setupLogoutButtons();
loadCurrentUser();
