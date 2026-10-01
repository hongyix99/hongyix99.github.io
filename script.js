(() => {
  "use strict";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const label = document.querySelector(".theme-label");
  const year = document.querySelector("#year");

  function applyTheme(theme) {
    const dark = theme === "dark";
    root.dataset.theme = dark ? "dark" : "light";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    if (label) label.textContent = dark ? "Light" : "Dark";
    if (themeColor) themeColor.setAttribute("content", dark ? "#171b20" : "#ffffff");
  }

  // Keep the reference's light appearance by default; honor an explicit saved choice.
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem("theme"); } catch (_) { /* Storage may be disabled. */ }
  applyTheme(savedTheme === "dark" ? "dark" : "light");
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try { window.localStorage.setItem("theme", next); } catch (_) { /* Theme still works for this visit. */ }
    });
  }
  if (year) year.textContent = String(new Date().getFullYear());
})();
