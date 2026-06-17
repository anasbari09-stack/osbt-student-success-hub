// Mobile menu controls
const menuButton = document.querySelector(".menu-button");
const closeButton = document.querySelector(".close-button");
const mobileDrawer = document.querySelector(".mobile-drawer");
const drawerLinks = document.querySelectorAll(".drawer-links a");

function openMenu() {
  mobileDrawer.classList.add("is-open");
  mobileDrawer.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  mobileDrawer.classList.remove("is-open");
  mobileDrawer.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && closeButton && mobileDrawer) {
  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
}

// Close the drawer after choosing a page.
drawerLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Homepage FAQ widget controls
const faqToggle = document.querySelector(".faq-toggle");
const faqPanel = document.querySelector(".faq-panel");
const faqClose = document.querySelector(".faq-close");
const categoryButtons = document.querySelectorAll(".faq-categories button");
const questionList = document.querySelector(".faq-questions");
const answerBox = document.querySelector(".faq-answer");
const emptyMessage = document.querySelector(".faq-empty");

const faqData = {
  admissions: [
    {
      question: "Comment commencer une question d'admission ?",
      answer: "Utilisez la page Demandes pour préparer votre question, puis suivez le processus officiel d'admission OSBT pour la réponse finale."
    },
    {
      question: "Où confirmer les conditions d'admission ?",
      answer: "Confirmez toujours les conditions d'admission sur les canaux officiels d'OSBT avant de prendre une décision."
    }
  ],
  programs: [
    {
      question: "Comment obtenir des informations sur les programmes ?",
      answer: "Commencez par identifier vos objectifs, puis contactez un conseiller ou un canal officiel OSBT pour les détails à jour."
    },
    {
      question: "Est-ce que cet espace peut choisir un programme pour moi ?",
      answer: "Non. Cet espace peut vous aider à organiser vos questions, mais le choix d'un programme doit être confirmé par l'orientation officielle."
    }
  ],
  events: [
    {
      question: "Où voir les événements à venir ?",
      answer: "Utilisez la page Événements pour voir les activités de l'école. Les données réelles pourront être ajoutées dans une prochaine étape."
    },
    {
      question: "Puis-je poser une question sur un événement ?",
      answer: "Oui. Utilisez Envoyer une demande pour poser une question sur l'heure, le lieu ou la participation."
    }
  ],
  support: [
    {
      question: "Quel type d'aide puis-je demander ?",
      answer: "Vous pouvez préparer des demandes sur le support académique, les événements, les dossiers étudiants ou l'aide générale."
    },
    {
      question: "Est-ce connecté à un vrai système de support ?",
      answer: "Pas encore complètement. Cette version garde une logique simple et évoluera vers un support plus complet."
    }
  ]
};

function openFaqPanel() {
  faqPanel.classList.add("is-open");
  faqPanel.setAttribute("aria-hidden", "false");
  faqToggle.setAttribute("aria-expanded", "true");
}

function closeFaqPanel() {
  faqPanel.classList.remove("is-open");
  faqPanel.setAttribute("aria-hidden", "true");
  faqToggle.setAttribute("aria-expanded", "false");
}

function showCategory(categoryName, activeButton) {
  const questions = faqData[categoryName];

  questionList.innerHTML = "";
  answerBox.textContent = "";
  emptyMessage.style.display = "none";

  categoryButtons.forEach(function (button) {
    button.classList.remove("is-active");
  });
  activeButton.classList.add("is-active");

  questions.forEach(function (item) {
    const questionButton = document.createElement("button");
    questionButton.className = "faq-question";
    questionButton.type = "button";
    questionButton.textContent = item.question;
    questionButton.addEventListener("click", function () {
      answerBox.textContent = item.answer;
    });

    questionList.appendChild(questionButton);
  });
}

if (faqToggle && faqPanel && faqClose && questionList && answerBox && emptyMessage) {
  faqToggle.addEventListener("click", function () {
    if (faqPanel.classList.contains("is-open")) {
      closeFaqPanel();
    } else {
      openFaqPanel();
    }
  });

  faqClose.addEventListener("click", closeFaqPanel);

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      showCategory(button.dataset.category, button);
    });
  });
}
