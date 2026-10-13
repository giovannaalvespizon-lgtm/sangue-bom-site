/* Navegacao progressiva: os links continuam acessiveis sem JavaScript. */
(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("navegacao");
  const desktop = window.matchMedia("(min-width: 1280px)");
  const year = document.getElementById("ano");
  if (year) year.textContent = String(new Date().getFullYear());
  if (!toggle || !nav) return;
  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.hidden = !open && !desktop.matches;
  }
  function syncLayout() {
    toggle.hidden = desktop.matches;
    setOpen(false);
  }
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a") && !desktop.matches) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !desktop.matches && !nav.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!desktop.matches && !event.target.closest(".site-header")) setOpen(false);
  });
  desktop.addEventListener("change", syncLayout);
  syncLayout();
})();
