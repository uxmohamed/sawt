"use client";

import { useState } from "react";
import type { LlmsDoc } from "@/lib/llms";
import { LlmsDocView } from "@/components/llms-doc-view";

export function ResultTabs({ doc, text }: { doc: LlmsDoc; text: string }) {
  const [tab, setTab] = useState<"parsed" | "raw">("parsed");

  return (
    <div className="space-y-4">
      <div className="flex w-fit rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
        {(["parsed", "raw"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
              tab === t
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "parsed" ? (
        <LlmsDocView doc={doc} />
      ) : (
        <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-100 dark:border dark:border-zinc-800">
          {text}
        </pre>
      )}
    </div>
  );
}
