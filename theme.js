"use strict";

(function initializeThemeControl() {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");

  if (!toggle) {
    return;
  }

  root.classList.add("js-enabled");

  let selectedTheme = "light";

  try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      selectedTheme = savedTheme;
    }
  } catch (error) {
    console.warn("The saved theme preference could not be read.");
  }

  function updateControl(theme) {
    const isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
  }

  function applyTheme(theme) {
    selectedTheme = theme;
    root.dataset.theme = theme;
    updateControl(theme);
  }

  function applyAndSaveTheme(theme) {
    applyTheme(theme);

    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      console.warn("The theme preference could not be saved.");
    }
  }

  applyTheme(selectedTheme);

  toggle.addEventListener("click", function () {
    const nextTheme = selectedTheme === "dark" ? "light" : "dark";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(function () {
        applyAndSaveTheme(nextTheme);
      });
    } else {
      applyAndSaveTheme(nextTheme);
    }
  });
}());
