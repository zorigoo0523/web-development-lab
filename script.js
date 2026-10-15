
"use strict";

// ===== 1. DARK / LIGHT MODE =====
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function updateThemeButton(isDark) {
  const icon = themeToggle.querySelector("span");

  icon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  updateThemeButton(isDark);
});

// ===== 2. ACCESSIBLE 3D FLIP CARDS =====
const cards = document.querySelectorAll(".flip-card");

cards.forEach((card) => {
  const flipButton = card.querySelector(".flip-button");

  function toggleFlip() {
    const isFlipped = card.classList.toggle("is-flipped");

    flipButton.setAttribute("aria-pressed", String(isFlipped));
    flipButton.textContent = isFlipped
      ? "Зургийг буцаах ↻"
      : "Түүхийг үзэх ↗";
  }

  // Картын товчоор эргүүлэх
  flipButton.addEventListener("click", toggleFlip);

  // Картын хоосон хэсэг дээр click хийж эргүүлэх
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    toggleFlip();
  });
});

// ===== 3. INITIALIZE =====
updateThemeButton(
  document.body.classList.contains("dark-mode")
);
