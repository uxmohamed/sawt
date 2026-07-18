import Link from "next/link";
import { REGISTRY } from "@/lib/registry";

const FEATURES = [
  {
    href: "/directory",
    title: "Directory",
    description: `Browse ${REGISTRY.length}+ curated sites that already publish an llms.txt — from AI platforms to web frameworks.`,
  },
  {
    href: "/viewer",
    title: "Viewer",
    description:
      "Point it at any site and it fetches, parses, and renders the llms.txt with structure checks.",
  },
  {
    href: "/generator",
    title: "Generator",
    description:
      "Build a spec-compliant llms.txt for your own project with a live preview, then copy or download it.",
  },
  {
    href: "/sounds",
    title: "Sounds",
    description:
      "54 UI sounds recreated from acoustic analysis and synthesized live in your browser with @web-kits/audio.",
  },
] as const;

const EXAMPLE = `# @web-kits/audio

> Composable audio primitives for the web.

## Docs

- [Getting started](https://audio.raphaelsalaja.com/docs): Install and first sounds
- [Concepts](https://audio.raphaelsalaja.com/concepts): Sources, envelopes, filters, effects, patches
- [API reference](https://audio.raphaelsalaja.com/api): Functions, types, hooks`;

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="pt-8 text-center">
        <p className="mb-4 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          The emerging convention for AI-readable docs
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Give your project a voice AI assistants can hear
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          <span className="font-mono text-base">llms.txt</span> is a simple markdown file at the
          root of your site that tells AI tools what your project is, what its API looks like, and
          where the docs live. sawt helps you explore, inspect, and create them.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/generator"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Generate yours
          </Link>
          <Link
            href="/directory"
            className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Browse the directory
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
          >
            <h2 className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {feature.title} →
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">What does one look like?</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            An llms.txt file is plain markdown with a fixed shape: an H1 title, a one-line summary
            in a blockquote, and H2 sections listing links with short descriptions. Small enough to
            fit in a context window, structured enough to be parsed.
          </p>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Point your AI tool at the URL, or reference it in your project&apos;s AI configuration:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 dark:border dark:border-zinc-800">
            {`{\n  "context": ["https://audio.raphaelsalaja.com/llms.txt"]\n}`}
          </pre>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100 dark:border dark:border-zinc-800">
          {EXAMPLE}
        </pre>
      </section>
    </div>
  );
}
