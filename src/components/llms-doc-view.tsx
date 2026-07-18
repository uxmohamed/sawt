import type { LlmsDoc } from "@/lib/llms";

/** Structured, readable rendering of a parsed llms.txt document. */
export function LlmsDocView({ doc }: { doc: LlmsDoc }) {
  return (
    <article className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold tracking-tight">{doc.title || "Untitled"}</h2>
        {doc.summary && (
          <p className="mt-2 border-l-2 border-indigo-500 pl-3 text-zinc-600 italic dark:text-zinc-400">
            {doc.summary}
          </p>
        )}
      </header>

      {doc.body.length > 0 && (
        <div className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {doc.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {doc.sections.map((section) => (
        <section key={section.name}>
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            {section.name}
          </h3>
          {section.notes.map((note, i) => (
            <p key={i} className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
              {note}
            </p>
          ))}
          <ul className="divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {section.links.map((link, i) => (
              <li key={i} className="bg-white p-3 dark:bg-zinc-900">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {link.title}
                </a>
                {link.description && (
                  <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {link.description}
                  </p>
                )}
                <p className="mt-0.5 truncate font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {link.url}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
