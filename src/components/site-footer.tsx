export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">sawt</span> — give your
          project a voice AI assistants can hear.
        </p>
        <p>
          Based on the{" "}
          <a
            href="https://llmstxt.org"
            className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900 dark:decoration-zinc-700 dark:hover:text-zinc-100"
            target="_blank"
            rel="noreferrer"
          >
            llms.txt proposal
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
