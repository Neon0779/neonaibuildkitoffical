import crypto from "crypto";
import { NextResponse } from "next/server";
import { initializeDatabase, sql } from "@/lib/db";
import {
  createBuyerSessionToken,
  sessionCookies,
} from "@/lib/session";

const PRICE_PAISE = 9900;

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);

  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json(
        { verified: false, error: "Missing verification data" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { verified: false, error: "Payment configuration missing" },
        { status: 500 }
      );
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (!safeEqual(razorpay_signature, expected)) {
      return NextResponse.json(
        { verified: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    await initializeDatabase();

    const orders = await sql`
      SELECT id, buyer_id, amount_paise, currency
      FROM orders
      WHERE provider_order_id = ${razorpay_order_id}
      LIMIT 1
    `;

    if (!orders.length) {
      return NextResponse.json(
        { verified: false, error: "Unknown order" },
        { status: 400 }
      );
    }

    const order = orders[0];

    if (
      Number(order.amount_paise) !== PRICE_PAISE ||
      order.currency !== "INR"
    ) {
      return NextResponse.json(
        { verified: false, error: "Order validation failed" },
        { status: 400 }
      );
    }

    const payment = await sql`
      INSERT INTO payments (
        order_id,
        provider_payment_id,
        status,
        verified_at
      )
      VALUES (
        ${Number(order.id)},
        ${razorpay_payment_id},
        'verified',
        NOW()
      )
      ON CONFLICT (provider_payment_id)
      DO UPDATE SET status = 'verified', verified_at = NOW()
      RETURNING id
    `;

    await sql`
      UPDATE orders
      SET status = 'paid', updated_at = NOW()
      WHERE id = ${Number(order.id)}
    `;

    const paymentId = Number(payment[0].id);

    let license = await sql`
      SELECT license_id
      FROM licenses
      WHERE payment_id = ${paymentId}
      LIMIT 1
    `;

    if (!license.length) {
      const licenseId =
        "NEON-" + crypto.randomBytes(8).toString("hex").toUpperCase();

      license = await sql`
        INSERT INTO licenses (
          buyer_id,
          payment_id,
          license_id,
          status
        )
        VALUES (
          ${Number(order.buyer_id)},
          ${paymentId},
          ${licenseId},
          'active'
        )
        RETURNING license_id
      `;
    }

    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30;

    const response = NextResponse.json({
      success: true,
      verified: true,
      licenseId: String(license[0].license_id),
      redirect: "/buyer",
    });

    response.cookies.set(
      sessionCookies.buyer,
      createBuyerSessionToken(Number(order.buyer_id), expiresAt),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { verified: false, error: "Unable to verify payment" },
      { status: 500 }
    );
  }
}
