import type { Metadata } from "next";
import { SoundBoard } from "./sound-board";

export const metadata: Metadata = {
  title: "Sounds",
  description:
    "A UI sound set recreated from acoustic analysis, synthesized live with @web-kits/audio.",
};

export default function SoundsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Sounds</h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        54 UI sounds recreated from acoustic analysis of reference recordings — onsets, pitch
        tracks, envelopes, and spectral character measured, then rebuilt as declarative{" "}
        <a
          href="https://audio.raphaelsalaja.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          @web-kits/audio
        </a>{" "}
        definitions. Nothing here is a recording: every sound is synthesized in your browser the
        moment you press play, from the{" "}
        <a
          href="/patches/recreated.json"
          className="font-mono text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          patch JSON
        </a>
        .
      </p>
      <div className="mt-8">
        <SoundBoard />
      </div>
    </div>
  );
}
