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

async function boot() {
  try {
    const [opportunities, stories, contacts] = await Promise.all([
      loadJson("./data/opportunities.json"),
      loadJson("./data/stories.json"),
      loadJson("./data/contacts.json")
    ]);
    renderMatches(opportunities);
    renderStories(stories);
    renderContacts(contacts);
    ["#level", "#institution", "#goal"].forEach((selector) => $(selector).addEventListener("change", () => renderMatches(opportunities)));
  } catch (error) {
    console.error(error);
    $("#finder-results").innerHTML = `<div class="empty"><strong>No se pudieron cargar los datos.</strong><br>Abre la versión publicada mediante GitHub Pages o inicia un servidor local según el README.</div>`;
  }
}

boot();
