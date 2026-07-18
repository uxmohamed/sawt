/** Server-side fetching of remote llms.txt files, shared by the viewer page and API route. */

const MAX_BYTES = 512 * 1024;
const TIMEOUT_MS = 10_000;

export type FetchLlmsResult =
  | { ok: true; url: string; text: string }
  | { ok: false; url?: string; error: string };

/** Hostnames and IP ranges we refuse to fetch to avoid proxying into private networks. */
function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  if (host === "0.0.0.0" || host === "::1" || host === "[::1]") return true;
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
  }
  return false;
}

/** Normalize user input into a fetchable llms.txt URL. */
function normalizeLlmsUrl(input: string): URL {
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!/llms(-\w+)?\.txt$/.test(url.pathname)) {
    url.pathname = `${url.pathname.replace(/\/$/, "")}/llms.txt`;
  }
  url.hash = "";
  return url;
}

export async function fetchLlmsTxt(input: string): Promise<FetchLlmsResult> {
  let url: URL;
  try {
    url = normalizeLlmsUrl(input);
  } catch {
    return { ok: false, error: "That doesn't look like a valid URL." };
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, error: "Only http(s) URLs are supported." };
  }
  if (isPrivateHost(url.hostname)) {
    return { ok: false, error: "Refusing to fetch private addresses." };
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "text/plain, text/markdown, */*" },
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        url: url.href,
        error: `The site responded with ${response.status} ${response.statusText}.`,
      };
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      return {
        ok: false,
        url: url.href,
        error: "File is larger than 512 KB — refusing to render it.",
      };
    }

    const text = new TextDecoder().decode(buffer);
    if (/^\s*<(!doctype|html)/i.test(text)) {
      return {
        ok: false,
        url: url.href,
        error: "The URL returned an HTML page, not an llms.txt file.",
      };
    }

    return { ok: true, url: url.href, text };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return {
      ok: false,
      url: url.href,
      error: timedOut
        ? "The request timed out after 10 seconds."
        : "Could not reach the site. Check the URL and try again.",
    };
  }
}
