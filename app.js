import { matchOpportunities } from "./lib/catalog.mjs";

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

function renderMatches(items) {
  const profile = { level: $("#level").value, institution: $("#institution").value, goal: $("#goal").value };
  const matches = matchOpportunities(items, profile);
  const target = $("#finder-results");
  if (!matches.length) {
    target.innerHTML = `<div class="empty"><strong>No encontramos una coincidencia exacta.</strong><br>Cambia el objetivo o revisa ELAP y la ruta de investigador visitante. También puedes abrir InVivoLab para explorar oportunidades globales.</div>`;
    return;
  }
  target.innerHTML = matches.map((item) => `
    <article class="result">
      <div class="result-tags"><span class="tag">${escapeHtml(item.statusLabel)}</span><span class="tag">${escapeHtml(item.duration)}</span></div>
      <h3>${escapeHtml(item.name)}</h3>
      <p><strong>Financiación:</strong> ${escapeHtml(item.funding)}</p>
      <p><strong>Cómo se postula:</strong> ${escapeHtml(item.applicationModel)}</p>
      <p><strong>Momento:</strong> ${escapeHtml(item.deadline)}</p>
      <p class="next"><strong>Primer paso:</strong> ${escapeHtml(item.firstStep)}</p>
      <a href="${escapeHtml(item.officialUrl)}" target="_blank" rel="noopener">Revisar fuente oficial ↗</a>
    </article>`).join("");
}

function renderStories(stories) {
  $("#stories").innerHTML = stories.map((story) => `
    <article class="story">
      <div class="badge">${escapeHtml(story.program)} · ${escapeHtml(story.year)}</div>
      <h3>${escapeHtml(story.name)}</h3>
      <div class="journey">${escapeHtml(story.origin)} → ${escapeHtml(story.destination)}</div>
      <p>${escapeHtml(story.result)}</p>
      <p class="lesson"><strong>Qué aprender:</strong> ${escapeHtml(story.lesson)}</p>
      <a href="${escapeHtml(story.sourceUrl)}" target="_blank" rel="noopener">Ver historia publicada ↗</a>
    </article>`).join("");
}

function renderContacts(contacts) {
  $("#contacts").innerHTML = contacts.map((contact) => `
    <article class="contact">
      <div class="badge">Contacto institucional</div>
      <h3>${escapeHtml(contact.name)}</h3>
      <p>${escapeHtml(contact.scope)}</p>
      <p><strong>${escapeHtml(contact.contact)}</strong></p>
      <a href="${escapeHtml(contact.url)}" target="_blank" rel="noopener">Verificar contacto ↗</a>
    </article>`).join("");
}

function renderYearProgress(now = new Date()) {
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  const formatted = new Intl.DateTimeFormat("es-PE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  }).format(now);

  $("#today-label").textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  $("#year-progress-label").textContent = `${Math.round(progress)}% del año`;
  $("#year-progress").style.width = `${progress}%`;
  $("#today-marker").style.left = `${progress}%`;
  $("#year-track").setAttribute("aria-label", `Avance de ${year}: ${Math.round(progress)} por ciento`);
}

function renderTimeline(items, opportunities, now = new Date()) {
  const currentMonth = now.getMonth() + 1;
  const sources = new Map(opportunities.map((item) => [item.id, item]));
  $("#timeline").innerHTML = items.map((item) => {
    const deadline = item.deadlineISO ? new Date(item.deadlineISO) : null;
    const isCurrent = item.months.includes(currentMonth) && (!deadline || now <= deadline);
    const isConfirmed = item.timingType === "Fecha oficial verificada";
    const source = item.sourceId ? sources.get(item.sourceId) : null;
    return `
      <article class="timeline-item${isCurrent ? " current" : ""}">
        <div class="timeline-when">
          <span class="timeline-stage">${escapeHtml(item.stage)}</span>
          <strong>${escapeHtml(item.period)}</strong>
          ${isCurrent ? '<span class="now-badge">En ventana este mes</span>' : ""}
        </div>
        <div class="timeline-work">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="timeline-duration">Tiempo de trabajo: ${escapeHtml(item.duration)}</p>
          <ul>${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul>
        </div>
        <div class="timeline-result">
          <span class="timing-type${isConfirmed ? " confirmed" : ""}">${escapeHtml(item.timingType)}</span>
          <p><strong>Resultado:</strong> ${escapeHtml(item.output)}</p>
          ${source ? `<a href="${escapeHtml(source.officialUrl)}" target="_blank" rel="noopener">Ver fecha oficial ↗</a>` : ""}
        </div>
      </article>`;
  }).join("");
}

async function boot() {
  try {
    const [opportunities, stories, contacts, timeline] = await Promise.all([
      loadJson("./data/opportunities.json"),
      loadJson("./data/stories.json"),
      loadJson("./data/contacts.json"),
      loadJson("./data/timeline.json")
    ]);
    renderMatches(opportunities);
    renderStories(stories);
    renderContacts(contacts);
    renderYearProgress();
    renderTimeline(timeline, opportunities);
    ["#level", "#institution", "#goal"].forEach((selector) => $(selector).addEventListener("change", () => renderMatches(opportunities)));
  } catch (error) {
    console.error(error);
    $("#finder-results").innerHTML = `<div class="empty"><strong>No se pudieron cargar los datos.</strong><br>Abre la versión publicada mediante GitHub Pages o inicia un servidor local según el README.</div>`;
  }
}

boot();
