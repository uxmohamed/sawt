"use client";

import { useEffect, useMemo, useState } from "react";
import { ensureReady, loadPatch, type AudioPatch, type SoundDefinition } from "@web-kits/audio";

const GROUP_LABELS: Record<string, string> = {
  alert: "Alerts",
  block: "Moderation",
  report: "Moderation",
  change: "Theme",
  chat: "Chat",
  nav: "Navigation",
  compliments: "Compliments",
  friend: "Friend requests",
  honk: "Honk",
  lets: "Calls",
  photo: "Notifications",
  typing: "Typing",
  search: "Search",
  they: "Presence",
  toggle: "Toggles",
  ui: "General UI",
};

function groupOf(name: string): string {
  return GROUP_LABELS[name.split("-")[0]] ?? "Other";
}

function layerCount(def: SoundDefinition): number {
  return "layers" in def ? def.layers.length : 1;
}

export function SoundBoard() {
  const [patch, setPatch] = useState<AudioPatch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [inspected, setInspected] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    loadPatch("/patches/recreated.json")
      .then((p) => live && setPatch(p))
      .catch((e) => live && setError(String(e)));
    return () => {
      live = false;
    };
  }, []);

  const groups = useMemo(() => {
    if (!patch) return [];
    const map = new Map<string, string[]>();
    for (const name of patch.sounds) {
      const g = groupOf(name);
      map.set(g, [...(map.get(g) ?? []), name]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [patch]);

  const play = async (name: string) => {
    if (!patch) return;
    await ensureReady();
    patch.play(name);
    setPlaying(name);
    setTimeout(() => setPlaying((p) => (p === name ? null : p)), 400);
  };

  if (error) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        Could not load the sound patch: {error}
      </p>
    );
  }
  if (!patch) {
    return <p className="text-sm text-zinc-500">Loading patch…</p>;
  }

  const inspectedDef = inspected ? patch.get(inspected) : undefined;

  return (
    <div className="space-y-8">
      {groups.map(([group, names]) => (
        <section key={group}>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            {group}
          </h2>
          <div className="flex flex-wrap gap-2">
            {names.map((name) => {
              const def = patch.get(name);
              return (
                <div
                  key={name}
                  className={`flex items-center overflow-hidden rounded-lg border transition-colors ${
                    playing === name
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                      : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => play(name)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <span className="text-indigo-600 dark:text-indigo-400">▶</span>
                    <span className="font-mono text-xs">{name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspected(inspected === name ? null : name)}
                    className="border-l border-zinc-200 px-2 py-2 text-xs text-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:hover:text-zinc-200"
                    title={`${def ? layerCount(def) : 0} layer(s) — view definition`}
                  >
                    {def ? layerCount(def) : 0}L
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {inspected && inspectedDef && (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-medium">{inspected}</h3>
            <button
              type="button"
              onClick={() => setInspected(null)}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Close
            </button>
          </div>
          <pre className="max-h-96 overflow-auto p-4 font-mono text-xs leading-relaxed">
            {JSON.stringify(inspectedDef, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
