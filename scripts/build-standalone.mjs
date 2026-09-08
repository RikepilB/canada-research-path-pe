import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const [html, browserApp, catalog, opportunities, stories, contacts] = await Promise.all([
  readFile(new URL("index.html", root), "utf8"),
  readFile(new URL("app.js", root), "utf8"),
  readFile(new URL("lib/catalog.mjs", root), "utf8"),
  readFile(new URL("data/opportunities.json", root), "utf8"),
  readFile(new URL("data/stories.json", root), "utf8"),
  readFile(new URL("data/contacts.json", root), "utf8")
]);

const data = {
  "./data/opportunities.json": JSON.parse(opportunities),
  "./data/stories.json": JSON.parse(stories),
  "./data/contacts.json": JSON.parse(contacts)
};
const inlineCatalog = catalog.replaceAll("export function", "function");
const inlineApp = browserApp
  .replace('import { matchOpportunities } from "./lib/catalog.mjs";\r\n', "")
  .replace('import { matchOpportunities } from "./lib/catalog.mjs";\n', "")
  .replace("async function loadJson(path) {\r\n", "async function loadJson(path) {\r\n  if (globalThis.CANADA_RESEARCH_PATH_DATA?.[path]) return globalThis.CANADA_RESEARCH_PATH_DATA[path];\r\n")
  .replace("async function loadJson(path) {\n", "async function loadJson(path) {\n  if (globalThis.CANADA_RESEARCH_PATH_DATA?.[path]) return globalThis.CANADA_RESEARCH_PATH_DATA[path];\n");
const inlineScript = `<script>\nwindow.CANADA_RESEARCH_PATH_DATA = ${JSON.stringify(data)};\n${inlineCatalog}\n${inlineApp}\n</script>`;
const standalone = html.replace('<script type="module" src="./app.js"></script>', inlineScript);

const outputDir = join(new URL(root).pathname.replace(/^\/(.:)/, "$1"), "dist");
await mkdir(outputDir, { recursive: true });
await mkdir(join(outputDir, "assets"), { recursive: true });
await writeFile(join(outputDir, "canada-research-path-pe.html"), standalone, "utf8");
await writeFile(join(outputDir, "index.html"), standalone, "utf8");
await Promise.all([
  copyFile(new URL("assets/og.png", root), join(outputDir, "assets", "og.png")),
  copyFile(new URL("robots.txt", root), join(outputDir, "robots.txt")),
  copyFile(new URL("sitemap.xml", root), join(outputDir, "sitemap.xml"))
]);
console.log("Creados dist/canada-research-path-pe.html y dist/index.html");
