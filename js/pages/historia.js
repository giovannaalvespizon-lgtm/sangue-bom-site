(() => {
 "use strict";
 const key = "sangue-bom-favoritos-v1";
 let favorites = [];
 try { const value = JSON.parse(localStorage.getItem(key) || "[]"); if (Array.isArray(value)) favorites = value.filter(x => typeof x === "string"); } catch (_) { /* Storage indisponivel: usar estado da sessao. */ }
 const status = document.getElementById("favorite-status");
 document.querySelectorAll(".story-like").forEach(button => {
  const id = button.dataset.story;
  function render() { const active = favorites.includes(id); button.setAttribute("aria-pressed", String(active)); const icon = button.querySelector("span"); if (icon) icon.textContent = active ? "♥" : "♡"; }
  render();
  button.addEventListener("click", () => {
   const active = !favorites.includes(id);
   favorites = active ? [...favorites, id] : favorites.filter(x => x !== id);
   render();
   let saved = true;
   try { localStorage.setItem(key, JSON.stringify(favorites)); } catch (_) { saved = false; }
   if (status) status.textContent = `Relato ${id} ${active ? "marcado como favorito" : "removido dos favoritos"}.${saved ? "" : " Preferencia mantida apenas nesta sessao."}`;
  });
 });
})();
