import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy route: browser → Next.js → Python ML server.
 *
 * The browser POSTs FormData (image + prompt + mode) here. We forward it
 * to the FastAPI server running on the user's local Python instance and
 * relay the JSON response back.
 *
 * In production this URL becomes the Cloudflare Tunnel hostname (set via
 * the ML_SERVER_URL env var on Vercel).
 */

const ML_SERVER_URL =
  process.env.ML_SERVER_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    // Pass the multipart form data straight through. We don't parse it
    // here — FastAPI does that on the other end.
    const incoming = await req.formData();

    const upstream = await fetch(`${ML_SERVER_URL}/generate`, {
      method: "POST",
      body: incoming,
      // Long generation jobs (TripoSR will hit ~60s) — don't time out fast.
      signal: AbortSignal.timeout(120_000),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: data?.detail ?? "ML server error",
          status: upstream.status,
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to reach ML server",
        detail: message,
        hint: `Is the FastAPI server running at ${ML_SERVER_URL}?`,
      },
      { status: 502 },
    );
  }
}