import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword || !sessionSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin authentication is not configured.",
        },
        { status: 500 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Password is required.",
        },
        { status: 400 }
      );
    }

    const supplied = crypto
      .createHash("sha256")
      .update(password)
      .digest();

    const expected = crypto
      .createHash("sha256")
      .update(adminPassword)
      .digest();

    if (!crypto.timingSafeEqual(supplied, expected)) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect admin password.",
        },
        { status: 401 }
      );
    }

    const expiresAt = Date.now() + 1000 * 60 * 60 * 12;

    const payload = `${expiresAt}`;

    const signature = crypto
      .createHmac("sha256", sessionSecret)
      .update(payload)
      .digest("hex");

    const token = `${payload}.${signature}`;

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("neon_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to login.",
      },
      { status: 500 }
    );
  }
}
