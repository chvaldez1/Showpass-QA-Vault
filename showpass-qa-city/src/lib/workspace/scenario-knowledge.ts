import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const testCasesFolder = "03 Test Cases";
const featureTerms: Record<string, string[]> = {
  "Box Office": ["boxoffice", "webboxoffice"],
  "Customer Accounts": ["my orders", "guest account"],
  "Customer Network": ["network management"],
  Customers: ["account credit", "venue customer"],
  "Event Discovery": ["discovery", "public search"],
  Packages: ["ticket bundle", "weekend pass"],
  Reservations: ["guestlist"],
};
const alternateFolders = new Set(["Check-In", "Widgets"]);

function searchable(text: string) {
  return ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\b([a-z]{4,})s\b/g, "$1").trim()} `;
}

function indexedNote(index: string, folder: string) {
  const lines = index.split(/\r?\n/);
  const heading = lines.indexOf(`- **${folder}**`);
  if (heading < 0) return "";
  const link = lines[heading + 1]?.match(/\[\[([^#|\]]+)/)?.[1];
  const folderPrefix = `${testCasesFolder}/${folder}/`;
  return link?.startsWith(folderPrefix) && !link.split("/").includes("..") ? `${link}.md` : "";
}

async function readNote(vault: string, note: string) {
  try {
    return await readFile(/* turbopackIgnore: true */ resolve(vault, note), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw error;
  }
}

async function readSection(vault: string, note: string, heading: string) {
  const lines = (await readNote(vault, note)).split(/\r?\n/);
  const start = lines.indexOf(heading);
  if (start === -1) return "";
  const end = lines.findIndex((line, index) => index > start && line.startsWith("#"));
  return lines.slice(start, end === -1 ? undefined : end).join("\n").trim();
}

async function readMatchingFeatures(vault: string, subject: string) {
  if (!subject.trim()) return "";
  const terms = searchable(subject);
  const [folders, index] = await Promise.all([
    readdir(/* turbopackIgnore: true */ resolve(vault, testCasesFolder), { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return [];
      throw error;
    }),
    readSection(vault, `${testCasesFolder}/Test Cases by Feature.md`, "## Feature Index"),
  ]);
  const matches = new Map<string, string>();
  for (const folder of folders.sort((a, b) => b.name.length - a.name.length)) {
    if (!folder.isDirectory() || alternateFolders.has(folder.name)) continue;
    const name = searchable(folder.name);
    const aliases = featureTerms[folder.name] ?? [];
    if (!matches.has(name) && [name, ...aliases.map(searchable)].some((term) => terms.includes(term))) {
      matches.set(name, folder.name);
    }
  }
  const entries = await Promise.all([...matches.values()].slice(0, 4).map(async (name) => {
    const path = `${testCasesFolder}/${name}`;
    const libraryNote = `${path}/${name} QA Library.md`;
    const library = await readNote(vault, libraryNote);
    const note = library ? libraryNote : indexedNote(index, name);
    const markdown = library || (note ? await readNote(vault, note) : "");
    if (!markdown) return "";
    const introduction = markdown.split(/^## Draft cases\s*$/m)[0].trim().slice(0, 2400);
    const drafts = markdown.match(/^### TC-\d+:.+$/gm)?.slice(0, 5).join("\n") ?? "";
    return [note, introduction, drafts].filter(Boolean).join("\n\n");
  }));
  return entries.filter(Boolean).join("\n\n");
}

export async function readScenarioKnowledge(vault: string, subject = "") {
  const sections = await Promise.all([
    readSection(vault, "00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes.md", "### Start with the setup and follow the records"),
    readSection(vault, `${testCasesFolder}/Test Cases by Feature.md`, "## Connected feature journeys"),
    readMatchingFeatures(vault, subject),
  ]);
  const guidance = sections.filter(Boolean).join("\n\n");
  if (!guidance) return "";
  return `Showpass QA Master Handbook and Test Cases knowledge base. Use relevant journeys as leads. Verify applicability from the available source, assignment details and saved evidence.\n\n${guidance}`;
}
