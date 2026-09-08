import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { matchOpportunities, validateCatalog } from "../lib/catalog.mjs";

const items = JSON.parse(await readFile(new URL("../data/opportunities.json", import.meta.url), "utf8"));
const timeline = JSON.parse(await readFile(new URL("../data/timeline.json", import.meta.url), "utf8"));

test("el catálogo cumple el contrato mínimo", () => {
  assert.deepEqual(validateCatalog(items), []);
});

test("GRI aparece para pregrado de Científica y no para otra universidad", () => {
  const profile = { level: "pregrado", goal: "pasantia", institution: "cientifica" };
  assert.ok(matchOpportunities(items, profile).some((item) => item.id === "mitacs-gri-2027"));
  assert.ok(!matchOpportunities(items, { ...profile, institution: "otra" }).some((item) => item.id === "mitacs-gri-2027"));
});

test("SICS nunca se recomienda a un perfil peruano", () => {
  const matches = matchOpportunities(items, { level: "pregrado", goal: "pasantia", institution: "otra" });
  assert.ok(!matches.some((item) => item.id === "sics-not-peru"));
  assert.ok(matches.some((item) => item.id === "elap"));
});

test("el calendario anual tiene intervalos válidos y una fecha oficial enlazada", () => {
  assert.equal(new Set(timeline.map((item) => item.id)).size, timeline.length);
  assert.ok(timeline.every((item) => item.months.length && item.months.every((month) => month >= 1 && month <= 12)));
  assert.ok(timeline.every((item) => item.duration && item.timingType && item.actions.length));
  assert.ok(timeline.some((item) => item.timingType === "Fecha oficial verificada" && item.sourceId === "mitacs-gri-2027"));
  assert.equal(timeline.find((item) => item.id === "mitacs-gri").deadlineISO, "2026-09-16T13:00:00-07:00");
});
