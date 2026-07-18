/**
 * Parser and serializer for the llms.txt format (https://llmstxt.org).
 *
 * An llms.txt file is markdown with a fixed shape:
 *   # Project name            (required H1)
 *   > Short summary           (optional blockquote)
 *   Free-form prose...        (optional paragraphs)
 *   ## Section name           (H2 sections containing link lists)
 *   - [Title](url): optional description
 */

export interface LlmsLink {
  title: string;
  url: string;
  description?: string;
}

export interface LlmsSection {
  name: string;
  /** Prose lines in the section that are not link items. */
  notes: string[];
  links: LlmsLink[];
}

export interface LlmsDoc {
  title: string;
  summary?: string;
  /** Prose between the summary and the first H2 section. */
  body: string[];
  sections: LlmsSection[];
}

const LINK_ITEM = /^[-*]\s+\[([^\]]+)\]\(([^)\s]+)\)\s*(?::\s*(.*))?$/;

export function parseLlmsTxt(text: string): LlmsDoc {
  const doc: LlmsDoc = { title: "", body: [], sections: [] };
  let current: LlmsSection | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("# ") && !doc.title) {
      doc.title = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("## ")) {
      current = { name: line.slice(3).trim(), notes: [], links: [] };
      doc.sections.push(current);
      continue;
    }
    if (line.startsWith("> ") && !current && !doc.summary) {
      doc.summary = line.slice(2).trim();
      continue;
    }

    const match = line.match(LINK_ITEM);
    if (match && current) {
      current.links.push({
        title: match[1],
        url: match[2],
        description: match[3]?.trim() || undefined,
      });
      continue;
    }

    if (current) {
      current.notes.push(line);
    } else {
      doc.body.push(line);
    }
  }

  return doc;
}

export function serializeLlmsTxt(doc: LlmsDoc): string {
  const out: string[] = [];
  out.push(`# ${doc.title.trim() || "Untitled project"}`);

  if (doc.summary?.trim()) {
    out.push("", `> ${doc.summary.trim()}`);
  }
  for (const para of doc.body) {
    if (para.trim()) out.push("", para.trim());
  }
  for (const section of doc.sections) {
    if (!section.name.trim()) continue;
    out.push("", `## ${section.name.trim()}`);
    for (const note of section.notes) {
      if (note.trim()) out.push("", note.trim());
    }
    if (section.links.length) out.push("");
    for (const link of section.links) {
      const title = link.title.trim() || link.url;
      const desc = link.description?.trim();
      out.push(`- [${title}](${link.url.trim()})${desc ? `: ${desc}` : ""}`);
    }
  }

  return out.join("\n") + "\n";
}

/** Basic shape checks with human-readable results, used by the viewer. */
export interface LlmsCheck {
  label: string;
  ok: boolean;
  detail: string;
}

export function checkLlmsDoc(doc: LlmsDoc): LlmsCheck[] {
  const linkCount = doc.sections.reduce((n, s) => n + s.links.length, 0);
  return [
    {
      label: "H1 title",
      ok: Boolean(doc.title),
      detail: doc.title
        ? `Found: “${doc.title}”`
        : "Missing. The file should start with `# Project name`.",
    },
    {
      label: "Blockquote summary",
      ok: Boolean(doc.summary),
      detail: doc.summary
        ? "A one-line summary is present."
        : "Optional but recommended: a `> summary` line after the title.",
    },
    {
      label: "Link sections",
      ok: doc.sections.length > 0,
      detail: doc.sections.length
        ? `${doc.sections.length} section${doc.sections.length === 1 ? "" : "s"}, ${linkCount} link${linkCount === 1 ? "" : "s"}.`
        : "Optional: `## Section` headings with `- [Title](url): description` lists.",
    },
  ];
}
