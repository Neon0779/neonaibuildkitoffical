import { NextResponse } from "next/server";
import { initializeDatabase, sql } from "@/lib/db";

const PRICE_PAISE = 9900;

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return null;
  const phone = value.replace(/\D/g, "");
  return phone.length >= 10 && phone.length <= 15 ? phone : null;
}

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay configuration missing" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Enter a valid email or mobile number." },
        { status: 400 }
      );
    }

    await initializeDatabase();

    let buyerId: number;

    if (email) {
      const existing = await sql`
        SELECT id FROM buyers
        WHERE LOWER(email) = ${email}
        LIMIT 1
      `;

      if (existing.length) {
        buyerId = Number(existing[0].id);
      } else {
        const created = await sql`
          INSERT INTO buyers (email, phone)
          VALUES (${email}, ${phone})
          RETURNING id
        `;
        buyerId = Number(created[0].id);
      }
    } else {
      const existing = await sql`
        SELECT id FROM buyers
        WHERE phone = ${phone}
        LIMIT 1
      `;

      if (existing.length) {
        buyerId = Number(existing[0].id);
      } else {
        const created = await sql`
          INSERT INTO buyers (email, phone)
          VALUES (${email}, ${phone})
          RETURNING id
        `;
        buyerId = Number(created[0].id);
      }
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: PRICE_PAISE,
        currency: "INR",
        receipt: `neon_${Date.now()}`,
        notes: {
          product: "NEON AI Build Kit",
          buyer_id: String(buyerId),
        },
      }),
      cache: "no-store",
    });

    const order = await response.json();

    if (!response.ok || !order.id) {
      return NextResponse.json(
        { error: "Unable to create payment order" },
        { status: 500 }
      );
    }

    await sql`
      INSERT INTO orders (
        buyer_id,
        provider_order_id,
        amount_paise,
        currency,
        status
      )
      VALUES (
        ${buyerId},
        ${order.id},
        ${PRICE_PAISE},
        'INR',
        'created'
      )
      ON CONFLICT (provider_order_id) DO NOTHING
    `;

    return NextResponse.json({
      id: order.id,
      amount: PRICE_PAISE,
      currency: "INR",
      key: keyId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
