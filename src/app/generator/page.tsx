import type { Metadata } from "next";
import { GeneratorClient } from "./generator-client";

export const metadata: Metadata = {
  title: "Generator",
  description: "Build a spec-compliant llms.txt for your project with a live preview.",
};

export default function GeneratorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Generator</h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Fill in your project details and sawt writes the llms.txt for you. Drop the result at
        the root of your site as <span className="font-mono text-sm">/llms.txt</span>.
      </p>
      <div className="mt-8">
        <GeneratorClient />
      </div>
    </div>
  );
}
