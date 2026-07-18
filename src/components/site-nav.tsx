"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/directory", label: "Directory" },
  { href: "/viewer", label: "Viewer" },
  { href: "/generator", label: "Generator" },
  { href: "/sounds", label: "Sounds" },
  { href: "/docs", label: "Docs" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-1 px-4 sm:px-6">
        <Link href="/" className="mr-4 flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 font-mono text-xs text-white">
            ~
          </span>
          sawt
        </Link>
        {LINKS.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <a
          href="/llms.txt"
          className="ml-auto rounded-md px-3 py-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          /llms.txt
        </a>
      </nav>
    </header>
  );
}
