/**
 * Curated directory of sites that publish an llms.txt file.
 * Availability is controlled by the site owners and may change;
 * every entry can be opened live in the viewer.
 */

export interface RegistryEntry {
  name: string;
  llmsUrl: string;
  site: string;
  category: Category;
  description: string;
}

export type Category =
  | "AI & ML"
  | "Web frameworks"
  | "Developer tools"
  | "Libraries"
  | "Infrastructure";

export const CATEGORIES: Category[] = [
  "AI & ML",
  "Web frameworks",
  "Developer tools",
  "Libraries",
  "Infrastructure",
];

export const REGISTRY: RegistryEntry[] = [
  {
    name: "llms.txt proposal",
    llmsUrl: "https://llmstxt.org/llms.txt",
    site: "https://llmstxt.org",
    category: "Developer tools",
    description:
      "The original specification site by Answer.AI — the proposal that started the convention.",
  },
  {
    name: "Anthropic",
    llmsUrl: "https://docs.anthropic.com/llms.txt",
    site: "https://docs.anthropic.com",
    category: "AI & ML",
    description: "Documentation for the Claude API and developer platform.",
  },
  {
    name: "Perplexity",
    llmsUrl: "https://docs.perplexity.ai/llms.txt",
    site: "https://docs.perplexity.ai",
    category: "AI & ML",
    description: "API documentation for Perplexity's search-grounded models.",
  },
  {
    name: "ElevenLabs",
    llmsUrl: "https://elevenlabs.io/docs/llms.txt",
    site: "https://elevenlabs.io/docs",
    category: "AI & ML",
    description: "Voice AI platform docs — text to speech, agents, and audio APIs.",
  },
  {
    name: "Cursor",
    llmsUrl: "https://docs.cursor.com/llms.txt",
    site: "https://docs.cursor.com",
    category: "Developer tools",
    description: "Documentation for the Cursor AI code editor.",
  },
  {
    name: "Svelte",
    llmsUrl: "https://svelte.dev/llms.txt",
    site: "https://svelte.dev",
    category: "Web frameworks",
    description:
      "Svelte and SvelteKit docs, with full and compact variants for different context sizes.",
  },
  {
    name: "Expo",
    llmsUrl: "https://docs.expo.dev/llms.txt",
    site: "https://docs.expo.dev",
    category: "Web frameworks",
    description: "React Native framework documentation for building universal apps.",
  },
  {
    name: "Cloudflare",
    llmsUrl: "https://developers.cloudflare.com/llms.txt",
    site: "https://developers.cloudflare.com",
    category: "Infrastructure",
    description: "Developer docs for Workers, Pages, R2, and the Cloudflare platform.",
  },
  {
    name: "Bun",
    llmsUrl: "https://bun.com/llms.txt",
    site: "https://bun.com",
    category: "Developer tools",
    description: "The fast all-in-one JavaScript runtime, bundler, and package manager.",
  },
  {
    name: "Drizzle ORM",
    llmsUrl: "https://orm.drizzle.team/llms.txt",
    site: "https://orm.drizzle.team",
    category: "Libraries",
    description: "TypeScript ORM documentation covering queries, migrations, and adapters.",
  },
  {
    name: "Modal",
    llmsUrl: "https://modal.com/docs/llms.txt",
    site: "https://modal.com/docs",
    category: "Infrastructure",
    description: "Serverless platform for running AI and data workloads in the cloud.",
  },
  {
    name: "@web-kits/audio",
    llmsUrl: "https://audio.raphaelsalaja.com/llms.txt",
    site: "https://audio.raphaelsalaja.com",
    category: "Libraries",
    description:
      "Web audio toolkit — sources, envelopes, filters, effects, and patches for the browser.",
  },
];
