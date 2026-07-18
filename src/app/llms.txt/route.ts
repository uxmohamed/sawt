import { serializeLlmsTxt } from "@/lib/llms";

/** sawt publishes its own llms.txt, naturally. */
const DOC = {
  title: "sawt",
  summary:
    "A platform for exploring, inspecting, and generating llms.txt files — the emerging convention for AI-readable project docs.",
  body: [
    "sawt (Arabic for “voice”) gives projects a voice AI assistants can hear. It offers a curated directory of sites publishing llms.txt, a viewer that fetches and structurally checks any llms.txt file, and a generator that writes spec-compliant files.",
  ],
  sections: [
    {
      name: "Pages",
      notes: [],
      links: [
        {
          title: "Directory",
          url: "/directory",
          description: "Curated, searchable list of sites that publish an llms.txt file",
        },
        {
          title: "Viewer",
          url: "/viewer",
          description: "Fetch, parse, and inspect any site's llms.txt with structure checks",
        },
        {
          title: "Generator",
          url: "/generator",
          description: "Build a spec-compliant llms.txt with a live preview",
        },
        {
          title: "Sounds",
          url: "/sounds",
          description:
            "UI sound set recreated from acoustic analysis, synthesized in-browser with @web-kits/audio",
        },
        {
          title: "Recreated sound patch",
          url: "/patches/recreated.json",
          description: "The @web-kits/audio patch JSON with all 54 recreated sound definitions",
        },
        {
          title: "Docs",
          url: "/docs",
          description: "What llms.txt is, the format anatomy, and how to publish one",
        },
      ],
    },
    {
      name: "Optional",
      notes: [],
      links: [
        {
          title: "llms.txt proposal",
          url: "https://llmstxt.org",
          description: "The original specification this platform is built around",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(serializeLlmsTxt(DOC), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
