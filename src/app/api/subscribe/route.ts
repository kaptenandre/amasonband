import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup endpoint.
 *
 * Right now this validates the address and accepts it. To connect a real
 * provider, set `actionUrl` on the Newsletter section in Sanity (e.g. a
 * Mailchimp endpoint) and forward to it here, or swap in an ESP SDK.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // TODO: forward `email` to your email service provider (Mailchimp, etc.).
  console.info(`[newsletter] signup: ${email}`);

  return NextResponse.json({ ok: true });
}
