# sawt

**sawt** (Arabic for "voice") is a platform for exploring, inspecting, and generating
[llms.txt](https://llmstxt.org) files — the emerging convention for helping AI assistants
understand a project quickly.

## Features

- **Directory** (`/directory`) — curated, searchable list of sites that publish an llms.txt file
- **Viewer** (`/viewer`) — fetch any site's llms.txt, check its structure against the spec, and render it for humans
- **Generator** (`/generator`) — build a spec-compliant llms.txt with a live preview, then copy or download it
- **Sounds** (`/sounds`) — 54 UI sounds recreated from acoustic analysis of reference recordings, synthesized live in the browser with [@web-kits/audio](https://audio.raphaelsalaja.com); the patch ships at `/patches/recreated.json`
- **Docs** (`/docs`) — what llms.txt is, the format anatomy, and how to publish one
- **`/llms.txt`** — sawt publishes its own, naturally

## How the sound recreation works

Each reference WAV was analyzed with an offline pipeline (onset detection on a
1 ms-hop RMS envelope, FFT pitch tracking with octave-error folding, spectral
flatness for tone-vs-noise classification, harmonic profiling for waveform
selection). Every detected acoustic event maps to a `@web-kits/audio` layer:
tonal events become oscillators (fixed pitch or sweep), broadband transients
become filtered noise bursts — plus a low sine "thump" body when the spectrum
shows one. The generated definitions were verified by rendering them with the
real library in headless Chromium and re-analyzing the output: all 54 sounds
reproduce their event structure, and 43 match the original pitch trajectories
within 12%.

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
