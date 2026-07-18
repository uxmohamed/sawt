import type { Metadata } from "next";
import { DirectoryBrowser } from "./directory-browser";

export const metadata: Metadata = {
  title: "Directory",
  description: "Curated directory of sites that publish an llms.txt file.",
};

export default function DirectoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Directory</h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Sites that publish an llms.txt file. Open any entry in the viewer to see its live,
        parsed contents. Files are hosted by the site owners, so availability can change.
      </p>
      <div className="mt-8">
        <DirectoryBrowser />
      </div>
    </div>
  );
}
