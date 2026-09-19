import { NextResponse } from "next/server";

export async function POST() {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay configuration missing" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 9900,
        currency: "INR",
        receipt: `neon_${Date.now()}`,
        notes: {
          product: "NEON AI Build Kit",
        },
      }),
      cache: "no-store",
    });

    const order = await response.json();

    if (!response.ok) {
      console.error("Razorpay order error:", order);

      return NextResponse.json(
        { error: "Unable to create payment order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
    });
  } catch (error) {
    console.error("Order creation failed:", error);

    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
