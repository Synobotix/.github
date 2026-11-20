import { NextResponse } from "next/server";

type TrackPayload = {
  event?: string;
  href?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackPayload;

    if (!body.event) {
      return NextResponse.json({ error: "Missing event." }, { status: 400 });
    }

    console.log("[track]", {
      event: body.event,
      href: body.href ?? null,
      source: body.source ?? null,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
}
