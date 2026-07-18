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

Each reference WAV goes through a deep analysis pipeline: onset detection on a
1 ms-hop RMS envelope, then per-event STFT partial tracking (spectral peaks
linked frame-by-frame with parabolic frequency interpolation), harmonic
grouping into fundamental + overtone series, residual noise characterization
(ratio, centroid, bandwidth), precise envelope measurement, and stereo pan
estimation.

Every acoustic event maps to `@web-kits/audio` layers: harmonic events become
`wavetable` sources carrying the measured overtone amplitudes, inharmonic
partials become parallel sine layers, and broadband residue becomes bandpassed
noise. The definitions are then refined by analysis-by-synthesis: each patch is
rendered with the real library in headless Chromium, re-analyzed with the same
pipeline, and corrected per event (pitch, gain, decay, timing) across several
passes, with a final detection-free window-based gain calibration against the
reference waveforms. Median residual errors: 0.2% pitch, ~3% level, ~3% decay;
mean clone score 90/100 across the 54 sounds.

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
