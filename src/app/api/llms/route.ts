import { NextRequest, NextResponse } from "next/server";
import { fetchLlmsTxt } from "@/lib/fetch-llms";

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("url");
  if (!input) {
    return NextResponse.json({ error: "Missing `url` query parameter." }, { status: 400 });
  }

  const result = await fetchLlmsTxt(input);
  if (!result.ok) {
    const status = result.url ? 502 : 400;
    return NextResponse.json({ error: result.error, url: result.url }, { status });
  }
  return NextResponse.json({ url: result.url, text: result.text });
}
