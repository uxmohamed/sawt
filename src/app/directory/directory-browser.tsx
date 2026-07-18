"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORIES, REGISTRY, type Category } from "@/lib/registry";

export function DirectoryBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REGISTRY.filter((entry) => {
      if (category && entry.category !== category) return false;
      if (!q) return true;
      return (
        entry.name.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.llmsUrl.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, description, or URL…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:max-w-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? null : c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                category === c
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          No entries match your search.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => (
            <li
              key={entry.llmsUrl}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{entry.name}</h2>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {entry.category}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                {entry.description}
              </p>
              <div className="mt-4 flex items-center gap-3 pt-1 text-sm">
                <Link
                  href={`/viewer?url=${encodeURIComponent(entry.llmsUrl)}`}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Open in viewer
                </Link>
                <a
                  href={entry.llmsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Raw file ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
