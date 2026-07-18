import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
  description: "What llms.txt is, how the format works, and how to publish one.",
};

function Code({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 dark:border dark:border-zinc-800">
      {children}
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">What is llms.txt?</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          <span className="font-mono text-sm">llms.txt</span> is an emerging convention, proposed
          by Jeremy Howard of Answer.AI, for helping AI assistants understand a project quickly. It
          is a single markdown file at the root of your site — like{" "}
          <span className="font-mono text-sm">robots.txt</span>, but written for language models
          instead of crawlers. Where robots.txt says what machines may read, llms.txt says what
          they <em>should</em> read.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-bold tracking-tight">What it contains</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>Project name and description</li>
          <li>Core API surface (functions, types, hooks)</li>
          <li>Key concepts and terminology</li>
          <li>Links to relevant documentation pages</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight">The format</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The file is plain markdown with a fixed anatomy, in this order:
        </p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>
            An <strong>H1</strong> with the project or site name — the only required element.
          </li>
          <li>
            A <strong>blockquote</strong> with a short one-line summary.
          </li>
          <li>Optional prose paragraphs with key context.</li>
          <li>
            <strong>H2 sections</strong> containing link lists:{" "}
            <span className="font-mono text-sm">- [Title](url): description</span>
          </li>
          <li>
            An optional section literally named <strong>Optional</strong> — links that can be
            skipped when a shorter context is needed.
          </li>
        </ol>
        <Code>{`# Project name

> One-line summary of what this project does.

Key context an assistant should know up front.

## Docs

- [Getting started](https://example.com/start): Installation and first steps
- [API reference](https://example.com/api): Functions, types, hooks

## Optional

- [Changelog](https://example.com/changelog): Release history`}</Code>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight">How to publish one</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Serve the file at your site root as <span className="font-mono text-sm">/llms.txt</span>.
          On most static hosts that just means dropping the file in your public directory. In a
          Next.js app you can also serve it from a route handler:
        </p>
        <Code>{`// app/llms.txt/route.ts
export function GET() {
  return new Response(llmsTxtContent, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}`}</Code>
        <p className="text-zinc-600 dark:text-zinc-400">
          Some sites also publish <span className="font-mono text-sm">llms-full.txt</span> — the
          entire documentation inlined as one large markdown file for tools that prefer a single
          fetch over following links.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight">How to use one</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Point your AI tool at the URL:
        </p>
        <Code>{`https://audio.raphaelsalaja.com/llms.txt`}</Code>
        <p className="text-zinc-600 dark:text-zinc-400">
          Or reference it in your project&apos;s AI configuration so assistants pick it up
          automatically:
        </p>
        <Code>{`{
  "context": ["https://audio.raphaelsalaja.com/llms.txt"]
}`}</Code>
      </section>

      <section>
        <h2 className="text-xl font-bold tracking-tight">Further reading</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <a
              href="https://llmstxt.org"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              llmstxt.org
            </a>{" "}
            <span className="text-zinc-500">— the original proposal and specification</span>
          </li>
          <li>
            <a
              href="/directory"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              The sawt directory
            </a>{" "}
            <span className="text-zinc-500">— real-world examples you can inspect</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
