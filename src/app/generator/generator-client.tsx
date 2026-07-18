"use client";

import { useMemo, useState } from "react";
import { serializeLlmsTxt, type LlmsDoc } from "@/lib/llms";
import { CopyButton } from "@/components/copy-button";

interface LinkDraft {
  title: string;
  url: string;
  description: string;
}

interface SectionDraft {
  name: string;
  links: LinkDraft[];
}

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900";

const emptyLink = (): LinkDraft => ({ title: "", url: "", description: "" });

export function GeneratorClient() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [sections, setSections] = useState<SectionDraft[]>([
    { name: "Docs", links: [emptyLink()] },
  ]);

  const output = useMemo(() => {
    const doc: LlmsDoc = {
      title,
      summary: summary || undefined,
      body: notes.split("\n").filter((line) => line.trim()),
      sections: sections
        .filter((s) => s.name.trim())
        .map((s) => ({
          name: s.name,
          notes: [],
          links: s.links
            .filter((l) => l.url.trim())
            .map((l) => ({
              title: l.title || l.url,
              url: l.url,
              description: l.description || undefined,
            })),
        })),
    };
    return serializeLlmsTxt(doc);
  }, [title, summary, notes, sections]);

  const updateSection = (index: number, patch: Partial<SectionDraft>) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const updateLink = (sectionIndex: number, linkIndex: number, patch: Partial<LinkDraft>) => {
    setSections((prev) =>
      prev.map((s, i) =>
        i === sectionIndex
          ? { ...s, links: s.links.map((l, j) => (j === linkIndex ? { ...l, ...patch } : l)) }
          : s,
      ),
    );
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "llms.txt";
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Project name</span>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="@web-kits/audio"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">One-line summary</span>
            <input
              className={inputClass}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Composable audio primitives for the web."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Notes <span className="font-normal text-zinc-500">(optional, one paragraph per line)</span>
            </span>
            <textarea
              className={`${inputClass} min-h-20 resize-y`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key concepts: sources, envelopes, filters, effects, patches."
            />
          </label>
        </div>

        {sections.map((section, si) => (
          <fieldset
            key={si}
            className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="mb-3 flex items-center gap-2">
              <input
                className={`${inputClass} font-medium`}
                value={section.name}
                onChange={(e) => updateSection(si, { name: e.target.value })}
                placeholder="Section name (e.g. Docs, API, Examples)"
              />
              <button
                type="button"
                onClick={() => setSections((prev) => prev.filter((_, i) => i !== si))}
                className="shrink-0 rounded-md border border-zinc-300 px-2.5 py-2 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-zinc-800"
                aria-label={`Remove section ${section.name || si + 1}`}
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {section.links.map((link, li) => (
                <div key={li} className="grid grid-cols-[1fr_auto] gap-2">
                  <div className="space-y-1.5">
                    <div className="grid gap-1.5 sm:grid-cols-2">
                      <input
                        className={inputClass}
                        value={link.title}
                        onChange={(e) => updateLink(si, li, { title: e.target.value })}
                        placeholder="Link title"
                      />
                      <input
                        className={`${inputClass} font-mono`}
                        value={link.url}
                        onChange={(e) => updateLink(si, li, { url: e.target.value })}
                        placeholder="https://…"
                      />
                    </div>
                    <input
                      className={inputClass}
                      value={link.description}
                      onChange={(e) => updateLink(si, li, { description: e.target.value })}
                      placeholder="Short description (optional)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection(si, { links: section.links.filter((_, j) => j !== li) })
                    }
                    className="self-start rounded-md border border-zinc-300 px-2.5 py-2 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    aria-label="Remove link"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateSection(si, { links: [...section.links, emptyLink()] })}
                className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                + Add link
              </button>
            </div>
          </fieldset>
        ))}

        <button
          type="button"
          onClick={() => setSections((prev) => [...prev, { name: "", links: [emptyLink()] }])}
          className="rounded-lg border border-dashed border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400"
        >
          + Add section
        </button>
      </div>

      <div className="lg:sticky lg:top-20">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Preview</h2>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <button
              type="button"
              onClick={download}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Download llms.txt
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-100 dark:border dark:border-zinc-800">
          {output}
        </pre>
      </div>
    </div>
  );
}
