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
      question: "How do I start an admissions question?",
      answer: "Use the request page to prepare your question, then follow the official OSBT admissions process for final guidance."
    },
    {
      question: "Where should I confirm requirements?",
      answer: "Always confirm admissions requirements through official OSBT channels before making decisions."
    }
  ],
  programs: [
    {
      question: "How can I learn about programs?",
      answer: "Start by identifying your goals, then ask a school advisor or official OSBT contact for current program details."
    },
    {
      question: "Can this hub choose a program for me?",
      answer: "No. This hub can help organize questions, but program decisions should come from official advising."
    }
  ],
  events: [
    {
      question: "Where can I see upcoming events?",
      answer: "Use the Events page to view placeholder school activities now. Real event data can be added in a later phase."
    },
    {
      question: "Can I ask about an event?",
      answer: "Yes. Use Submit Request to prepare a question about event timing, location, or participation."
    }
  ],
  support: [
    {
      question: "What kind of help can I request?",
      answer: "You can prepare requests about academic support, events, student records, or general school help."
    },
    {
      question: "Is this connected to a real support system?",
      answer: "Not yet. This is a frontend-only prototype, so no message is submitted to a backend."
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
