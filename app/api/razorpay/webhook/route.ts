import crypto from "crypto";
import { NextResponse } from "next/server";
import { initializeDatabase, sql } from "@/lib/db";

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

export async function POST(request: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Webhook is not configured" },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 }
      );
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (!safeEqual(signature, expected)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);

    const eventId =
      request.headers.get("x-razorpay-event-id") ||
      crypto.createHash("sha256").update(rawBody).digest("hex");

    await initializeDatabase();

    const existing = await sql`
      SELECT id
      FROM webhook_events
      WHERE event_id = ${eventId}
      LIMIT 1
    `;

    if (existing.length) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await sql`
      INSERT INTO webhook_events (event_id, event_type)
      VALUES (${eventId}, ${String(payload.event || "unknown")})
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
