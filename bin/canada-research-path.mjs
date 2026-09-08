#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { findOpportunity, matchOpportunities, validateCatalog } from "../lib/catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [opportunities, timeline] = await Promise.all([
  readFile(join(root, "data", "opportunities.json"), "utf8").then(JSON.parse),
  readFile(join(root, "data", "timeline.json"), "utf8").then(JSON.parse)
]);
const [command = "help", ...args] = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((arg) => arg.startsWith("--")).map((arg) => {
  const [key, ...parts] = arg.slice(2).split("=");
  return [key, parts.length ? parts.join("=") : true];
}));
const positional = args.filter((arg) => !arg.startsWith("--"));

const print = (value) => console.log(flags.json !== undefined ? JSON.stringify(value, null, 2) : value);

switch (command) {
  case "list": {
    const items = opportunities.filter((item) => flags.all !== undefined || item.eligiblePeru);
    print(flags.json !== undefined ? items : items.map(line).join("\n"));
    break;
  }
  case "match": {
    const required = ["level", "institution", "goal"];
    const missing = required.filter((key) => !flags[key]);
    if (missing.length) fail(`Faltan opciones: ${missing.map((key) => `--${key}=...`).join(", ")}`);
    const items = matchOpportunities(opportunities, flags);
    print(flags.json !== undefined ? items : items.length ? items.map(line).join("\n") : "Sin coincidencias exactas. Prueba otra meta o revisa ELAP.");
    break;
  }
  case "show": {
    const item = findOpportunity(opportunities, positional[0]);
    if (!item) fail(`No existe la oportunidad: ${positional[0] ?? "(sin id)"}`);
    print(flags.json !== undefined ? item : formatDetails(item));
    break;
  }
  case "validate": {
    const errors = validateCatalog(opportunities);
    if (errors.length) fail(errors.join("\n"));
    print(`Catálogo válido: ${opportunities.length} rutas, ${opportunities.filter((item) => item.eligiblePeru).length} aplicables a Perú.`);
    break;
  }
  case "timeline":
    print(flags.json !== undefined ? timeline : timeline.map(timelineLine).join("\n"));
    break;
  case "invivo":
    print(flags.json !== undefined ? {
      name: "InVivoLab",
      url: "https://invivolab.org/oportunidades",
      relationship: "Fuente complementaria independiente",
      policy: "No copiar ni redistribuir su base sin autorización previa"
    } : "InVivoLab: https://invivolab.org/oportunidades\nCatálogo general STEM para Latinoamérica. Esta CLI no copia su base; abre y promueve la fuente original.");
    break;
  case "help":
  default:
    print(`Canada Research Path PE\n\nComandos:\n  list [--json] [--all]\n  show <id> [--json]\n  match --level=pregrado --institution=otra --goal=pasantia [--json]\n  timeline [--json]\n  validate\n  invivo [--json]\n\nNiveles: secundaria, pregrado, egresado, maestria, doctorado, posdoctorado, investigador\nInstituciones: cientifica, unalm, otra\nMetas: pasantia, intercambio, pregrado-completo, maestria-completa, doctorado-completo, posdoctorado, empleo-investigacion`);
}

function line(item) {
  return `${item.id.padEnd(28)} ${item.statusLabel} · ${item.name}`;
}

function timelineLine(item) {
  return `${item.period.padEnd(23)} ${item.stage.padEnd(19)} ${item.title} · ${item.duration}`;
}

function formatDetails(item) {
  return `${item.name}\nEstado: ${item.statusLabel}\nPlazo: ${item.deadline}\nFinanciación: ${item.funding}\nPostulación: ${item.applicationModel}\nPrimer paso: ${item.firstStep}\nFuente: ${item.officialUrl}`;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
