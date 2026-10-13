/* Lista progressiva + mapa opcional. Dados externos nunca entram via innerHTML. */
(() => {
  "use strict";
  const units = window.SANGUE_BOM_UNIDADES || [];
  const $ = (id) => document.getElementById(id);
  const list = $("lista-unidades"), modalList = $("lista-modal"), dialog = $("modal-unidades");
  if (!list || !dialog) return;
  let reference = null, selected = null, map = null, markers = new Map(), userMarker = null;
  let filtered = [...units], loading = false, focusAfterClose = null;
  const normalize = (text) => String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  function distance(unit) {
    const rad = (x) => x * Math.PI / 180;
    const dLat = rad(unit.lat - reference.lat), dLng = rad(unit.lng - reference.lng);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(reference.lat)) * Math.cos(rad(unit.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
  }
  function ordered(items) {
    return [...items].sort((a,b) => reference ? distance(a)-distance(b) : a.nome.localeCompare(b.nome, "pt-BR"));
  }
  function node(tag, className, text) {
    const el = document.createElement(tag); if (className) el.className = className;
    if (text !== undefined) el.textContent = text; return el;
  }
  function renderList(container, items) {
    container.replaceChildren();
    if (!items.length) { container.append(node("li", "list-empty", "Nenhuma unidade encontrada. Tente outro termo ou limpe os filtros.")); return; }
    for (const unit of ordered(items)) {
      const li = node("li"), button = node("button", "unit-button");
      button.type = "button"; button.dataset.id = unit.id;
      button.setAttribute("aria-pressed", String(selected === unit.id));
      const pin = node("span", "unit-pin", "●"); pin.setAttribute("aria-hidden", "true");
      const copy = node("span", "unit-copy");
      copy.append(node("strong", "", unit.nome), node("span", "unit-address", unit.endereco));
      copy.append(node("small", "", reference ? `${distance(unit).toFixed(1).replace(".", ",")} km em linha reta · confirme atendimento` : "Horários: confirme com a unidade"));
      const arrow = node("span", "unit-chevron", "›"); arrow.setAttribute("aria-hidden", "true");
      button.append(pin,copy,arrow); li.append(button); container.append(li);
    }
  }
  function syncPressed() {
    document.querySelectorAll(".unit-button").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.id === selected)));
  }
  function selectUnit(unit, fromModal = false) {
    selected = unit.id;
    $("unidade-detalhe").hidden = false;
    $("detalhe-nome").textContent = unit.nome; $("detalhe-endereco").textContent = unit.endereco;
    const url = new URL("https://www.google.com/maps/dir/");
    url.searchParams.set("api", "1"); url.searchParams.set("destination", unit.endereco);
    $("abrir-rota").href = url.href;
    syncPressed();
    if (map) { map.setView([unit.lat, unit.lng], 15); markers.get(unit.id)?.openPopup(); }
    if (fromModal) { focusAfterClose = $("abrir-rota"); dialog.close(); }
  }
  function updateMap() {
    if (!map) return;
    markers.forEach((marker) => marker.remove()); markers.clear();
    for (const unit of filtered) {
      const popup = node("div"); popup.append(node("strong", "", unit.nome),node("p", "", unit.endereco));
      const marker = L.circleMarker([unit.lat,unit.lng], {radius:9,color:"#8e0710",fillColor:"#b50916",fillOpacity:1,weight:2}).addTo(map).bindPopup(popup);
      marker.on("click", () => selectUnit(unit)); markers.set(unit.id,marker);
    }
    if (reference) {
      if (userMarker) userMarker.remove();
      userMarker = L.circleMarker([reference.lat,reference.lng], {radius:7,color:"#fff",fillColor:"#1462ba",fillOpacity:1,weight:3}).addTo(map).bindPopup("Sua localização aproximada");
    }
  }
  function render() {
    renderList(list, filtered); renderList(modalList, units); updateMap();
    $("mensagem").textContent = `${filtered.length} unidade(s) encontrada(s) nesta base.`;
  }
  function filter() {
    const term = normalize($("campo-busca").value), type = $("filtro-tipo").value;
    filtered = units.filter((u) => (!type || u.tipo === type) && normalize(`${u.nome} ${u.endereco} ${u.tipo}`).includes(term));
    render();
    if (map && filtered.length) map.fitBounds(filtered.map(u => [u.lat,u.lng]), {padding:[30,30],maxZoom:13});
  }
  [list,modalList].forEach((container) => container.addEventListener("click", (event) => {
    const button = event.target.closest(".unit-button"); if (!button) return;
    const unit = units.find(u => u.id === button.dataset.id); if (unit) selectUnit(unit,container === modalList);
  }));
  $("form-busca").addEventListener("submit", (e) => { e.preventDefault(); filter(); });
  $("campo-busca").addEventListener("input",filter); $("filtro-tipo").addEventListener("change",filter);
  $("limpar-filtros").addEventListener("click", () => { $("campo-busca").value=""; $("filtro-tipo").value=""; filter(); $("campo-busca").focus(); });
  $("abrir-modal").addEventListener("click", () => { renderList(modalList,units); dialog.showModal(); document.body.style.overflow="hidden"; });
  $("fechar-modal").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { document.body.style.overflow=""; (focusAfterClose || $("abrir-modal")).focus(); focusAfterClose = null; });
  dialog.addEventListener("click", (e) => { const box=dialog.getBoundingClientRect(); if(e.target===dialog && (e.clientX<box.left || e.clientX>box.right || e.clientY<box.top || e.clientY>box.bottom)) dialog.close(); });
  $("usar-localizacao").addEventListener("click", () => {
    const button=$("usar-localizacao");
    if (!navigator.geolocation) { $("mensagem").textContent="Localização indisponível. Use a busca por nome, bairro ou cidade."; return; }
    button.disabled=true; $("mensagem").textContent="Solicitando permissão para usar sua localização…";
    navigator.geolocation.getCurrentPosition((pos) => {
      button.disabled=false; reference={lat:pos.coords.latitude,lng:pos.coords.longitude};
      $("referencia").textContent="Ordenação pela sua localização. Distâncias aproximadas em linha reta, não trajetos de viagem. A localização não é armazenada pelo site.";
      render(); if(map) map.setView([reference.lat,reference.lng],11);
    }, () => { button.disabled=false; $("mensagem").textContent="Não foi possível obter a localização. Verifique a permissão ou use a busca. Em hospedagem, utilize HTTPS."; }, {timeout:10000,maximumAge:60000,enableHighAccuracy:false});
  });
  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    return new Promise((resolve,reject) => {
      const css=document.createElement("link"); css.rel="stylesheet"; css.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
      const script=document.createElement("script"); script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      const timer=setTimeout(() => { script.remove(); reject(new Error("Tempo limite")); },12000);
      script.onload=() => {clearTimeout(timer);window.L?resolve():reject(new Error("Biblioteca indisponível"));};
      script.onerror=() => {clearTimeout(timer);script.remove();reject(new Error("Falha de rede"));};document.head.append(script);
    });
  }
  $("carregar-mapa").addEventListener("click", async () => {
    if(loading || map) return; loading=true; $("carregar-mapa").disabled=true;
    $("mapa-status").textContent="Carregando o mapa externo…";
    try {
      await loadLeaflet(); $("mapa").hidden=false; $("mapa-alternativa").hidden=true;
      map=L.map("mapa",{scrollWheelZoom:false}).setView([-23.5505,-46.6333],11);
      const config=window.SANGUE_BOM_MAP_CONFIG || {};
      const tiles=L.tileLayer(config.tileUrl || "https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:config.attribution || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
      tiles.on("tileerror", () => { $("mensagem").textContent="Algumas imagens do mapa não carregaram. A lista e os links de rota continuam disponíveis."; });
      updateMap(); if(selected) selectUnit(units.find(u=>u.id===selected));
    } catch(error) {
      if(map) {map.remove();map=null;}
      $("mapa").hidden=true; $("mapa-alternativa").hidden=false;
      $("mapa-status").textContent="Não foi possível carregar o mapa. Selecione uma unidade e consulte a rota pelo link, ou tente novamente.";
      $("carregar-mapa").textContent="Tentar carregar novamente";
    } finally {loading=false;$("carregar-mapa").disabled=false;}
  });
  render();
})();
