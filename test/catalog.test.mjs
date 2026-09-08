import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { matchOpportunities, validateCatalog } from "../lib/catalog.mjs";

const items = JSON.parse(await readFile(new URL("../data/opportunities.json", import.meta.url), "utf8"));

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
