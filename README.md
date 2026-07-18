# sawt

**sawt** (Arabic for "voice") is a platform for exploring, inspecting, and generating
[llms.txt](https://llmstxt.org) files — the emerging convention for helping AI assistants
understand a project quickly.

## Features

- **Directory** (`/directory`) — curated, searchable list of sites that publish an llms.txt file
- **Viewer** (`/viewer`) — fetch any site's llms.txt, check its structure against the spec, and render it for humans
- **Generator** (`/generator`) — build a spec-compliant llms.txt with a live preview, then copy or download it
- **Docs** (`/docs`) — what llms.txt is, the format anatomy, and how to publish one
- **`/llms.txt`** — sawt publishes its own, naturally

## Development

```bash
pnpm install
pnpm dev
```

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Project structure

```
src/
  lib/llms.ts          # llms.txt parser, serializer, and structure checks
  lib/registry.ts      # curated directory entries
  components/          # nav, footer, shared UI
  app/
    api/llms/route.ts  # server-side fetch proxy for the viewer (CORS + SSRF guarded)
    llms.txt/route.ts  # sawt's own llms.txt
    directory/         # directory browser
    viewer/            # llms.txt viewer
    generator/         # llms.txt generator
    docs/              # format documentation
```
