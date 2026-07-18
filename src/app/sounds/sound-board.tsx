"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ensureReady, loadPatch, type AudioPatch, type SoundDefinition } from "@web-kits/audio";
import { CLONE_REPORT, MEAN_SCORE } from "@/lib/clone-report";

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

function scoreClass(score: number): string {
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 80) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function meterClass(score: number): string {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 80) return "bg-amber-500";
  return "bg-red-500";
}

type SortMode = "family" | "score";

export function SoundBoard() {
  const [patch, setPatch] = useState<AudioPatch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [inspected, setInspected] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("family");
  const refAudio = useRef<HTMLAudioElement | null>(null);
  const abTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let live = true;
    loadPatch("/patches/recreated.json")
      .then((p) => live && setPatch(p))
      .catch((e) => live && setError(String(e)));
    return () => {
      live = false;
      refAudio.current?.pause();
      if (abTimer.current) clearTimeout(abTimer.current);
    };
  }, []);

  const groups = useMemo(() => {
    if (!patch) return [];
    if (sort === "score") {
      const names = [...patch.sounds].sort(
        (a, b) => (CLONE_REPORT[a]?.score ?? 0) - (CLONE_REPORT[b]?.score ?? 0),
      );
      return [["Sorted by score — lowest first", names]] as [string, string[]][];
    }
    const map = new Map<string, string[]>();
    for (const name of patch.sounds) {
      const g = groupOf(name);
      map.set(g, [...(map.get(g) ?? []), name]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [patch, sort]);

  const stopAll = () => {
    refAudio.current?.pause();
    refAudio.current = null;
    if (abTimer.current) clearTimeout(abTimer.current);
    abTimer.current = null;
  };

  const flash = (key: string, duration = 500) => {
    setPlaying(key);
    setTimeout(() => setPlaying((p) => (p === key ? null : p)), duration);
  };

  const playRef = (name: string, onEnded?: () => void) => {
    stopAll();
    const audio = new Audio(`/ref/${name}.flac`);
    refAudio.current = audio;
    if (onEnded) audio.onended = onEnded;
    audio.play();
    flash(`ref:${name}`, 700);
  };

  const playClone = async (name: string) => {
    if (!patch) return;
    stopAll();
    await ensureReady();
    patch.play(name);
    flash(`clone:${name}`, 700);
  };

  const playAB = (name: string) => {
    playRef(name, () => {
      abTimer.current = setTimeout(() => playClone(name), 350);
    });
    flash(`ab:${name}`, 1400);
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
  const btn =
    "px-2 py-1.5 font-mono text-[11px] font-semibold tracking-wide transition-colors";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Mean clone fidelity:{" "}
          <span className={`font-mono font-bold ${scoreClass(MEAN_SCORE)}`}>{MEAN_SCORE}</span>
          <span className="text-zinc-400">/100</span>
        </p>
        <div className="ml-auto flex rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
          {(["family", "score"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSort(m)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                sort === m
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              by {m}
            </button>
          ))}
        </div>
      </div>

      {groups.map(([group, names]) => (
        <section key={group}>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            {group}
          </h2>
          <div className="grid gap-2 lg:grid-cols-2">
            {names.map((name) => {
              const def = patch.get(name);
              const report = CLONE_REPORT[name];
              const active = playing?.endsWith(`:${name}`);
              return (
                <div
                  key={name}
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border bg-white px-3 py-2 transition-colors dark:bg-zinc-900 ${
                    active
                      ? "border-indigo-500"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setInspected(inspected === name ? null : name)}
                    className="min-w-0 flex-1 truncate text-left font-mono text-xs font-semibold hover:text-indigo-600 dark:hover:text-indigo-400"
                    title={`${def ? layerCount(def) : 0} layer(s) — view definition`}
                  >
                    {name}
                  </button>

                  {report && (
                    <span className="flex items-center gap-1.5" title="clone fidelity score">
                      <span className="h-1 w-10 overflow-hidden rounded bg-zinc-200 dark:bg-zinc-700">
                        <span
                          className={`block h-full rounded ${meterClass(report.score)}`}
                          style={{ width: `${report.score}%` }}
                        />
                      </span>
                      <span className={`font-mono text-xs font-bold ${scoreClass(report.score)}`}>
                        {report.score.toFixed(0)}
                      </span>
                    </span>
                  )}

                  <span className="flex overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
                    <button
                      type="button"
                      onClick={() => playRef(name)}
                      className={`${btn} ${playing === `ref:${name}` ? "bg-indigo-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                      title="play the reference recording"
                    >
                      REF
                    </button>
                    <button
                      type="button"
                      onClick={() => playClone(name)}
                      className={`${btn} border-l border-zinc-300 dark:border-zinc-700 ${playing === `clone:${name}` ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950"}`}
                      title="synthesize the clone live"
                    >
                      CLONE
                    </button>
                    <button
                      type="button"
                      onClick={() => playAB(name)}
                      className={`${btn} border-l border-zinc-300 dark:border-zinc-700 ${playing === `ab:${name}` ? "bg-indigo-600 text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                      title="play reference, then clone"
                    >
                      A→B
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {inspected && inspectedDef && (
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
            <h3 className="font-mono text-sm font-medium">{inspected}</h3>
            {CLONE_REPORT[inspected] && (
              <p className="font-mono text-xs text-zinc-500">
                events {CLONE_REPORT[inspected].events}% · pitch err{" "}
                {CLONE_REPORT[inspected].pitch.toFixed(1)}% · level err{" "}
                {CLONE_REPORT[inspected].level}% · envelope corr{" "}
                {CLONE_REPORT[inspected].envcor.toFixed(2)}
              </p>
            )}
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
