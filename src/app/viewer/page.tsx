import type { Metadata } from "next";
import { fetchLlmsTxt } from "@/lib/fetch-llms";
import { checkLlmsDoc, parseLlmsTxt } from "@/lib/llms";
import { ResultTabs } from "./result-tabs";
import { CopyButton } from "@/components/copy-button";

export const metadata: Metadata = {
  title: "Viewer",
  description: "Fetch, parse, and inspect any site's llms.txt file.",
};

export default async function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const { url } = await searchParams;
  const target = url?.trim();
  const result = target ? await fetchLlmsTxt(target) : null;
  const doc = result?.ok ? parseLlmsTxt(result.text) : null;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Viewer</h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Enter a site or a direct llms.txt URL. sawt fetches the file, checks its structure
        against the spec, and renders it for humans.
      </p>

      <form action="/viewer" method="get" className="mt-8 flex gap-2">
        <input
          type="text"
          name="url"
          defaultValue={target ?? ""}
          placeholder="svelte.dev — or a full URL like https://docs.anthropic.com/llms.txt"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Fetch
        </button>
      </form>

      <div className="mt-6">
        {result && !result.ok && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {result.error}
            {result.url && (
              <span className="mt-1 block font-mono text-xs opacity-70">{result.url}</span>
            )}
          </p>
        )}

        {result?.ok && doc && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                className="truncate font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {result.url} ↗
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="font-mono text-xs text-zinc-500">
                {(result.text.length / 1024).toFixed(1)} KB
              </span>
              <div className="ml-auto">
                <CopyButton text={result.text} />
              </div>
            </div>

            <ul className="grid gap-2 sm:grid-cols-3">
              {checkLlmsDoc(doc).map((check) => (
                <li
                  key={check.label}
                  className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-sm font-medium">
                    <span className={check.ok ? "text-emerald-600" : "text-amber-600"}>
                      {check.ok ? "✓" : "•"}
                    </span>{" "}
                    {check.label}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{check.detail}</p>
                </li>
              ))}
            </ul>

            <ResultTabs doc={doc} text={result.text} />
          </div>
        )}

        {!result && (
          <p className="rounded-lg border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700">
            Try it with a site from the{" "}
            <a href="/directory" className="text-indigo-600 hover:underline dark:text-indigo-400">
              directory
            </a>
            , or paste any domain — sawt will look for <span className="font-mono">/llms.txt</span>{" "}
            automatically.
          </p>
        )}
      </div>
    </div>
  );
}
