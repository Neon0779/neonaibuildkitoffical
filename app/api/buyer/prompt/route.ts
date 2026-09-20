import { NextResponse } from "next/server";
import { initializeDatabase, sql } from "@/lib/db";
import { getBuyerSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getBuyerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await initializeDatabase();

  const licenses = await sql`
    SELECT license_id, status
    FROM licenses
    WHERE buyer_id = ${session.buyerId}
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (!licenses.length || licenses[0].status !== "active") {
    return NextResponse.json(
      { error: "Active license required" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const allowedPersonality = [
    "Friendly & Helpful",
    "Professional & Calm",
    "Witty & Playful",
    "Minimal & Direct",
  ];

  const allowedVoice = ["Female", "Male", "No preference"];

  const allowedTheme = [
    "Neon Blue/Cyan",
    "Purple/Blue",
    "Red/Black",
    "Green/Black",
    "Minimal Dark",
  ];

  const allowedLanguage = ["Hinglish", "Hindi", "English"];

  const assistantName =
    typeof body.assistantName === "string"
      ? body.assistantName.trim().slice(0, 40)
      : "";

  if (
    !assistantName ||
    !allowedPersonality.includes(body.personality) ||
    !allowedVoice.includes(body.voice) ||
    !allowedTheme.includes(body.theme) ||
    !allowedLanguage.includes(body.language)
  ) {
    return NextResponse.json(
      { error: "Invalid personalization settings" },
      { status: 400 }
    );
  }

  const prompt = `You are my Android AI Assistant Build Engineer.

Build a personal Android AI assistant named "${assistantName}".

Preferences:
- Personality: ${body.personality}
- Voice preference: ${body.voice}
- Theme: ${body.theme}
- Conversation language: ${body.language}

Rules:
- Guide me one verified stage at a time.
- Give exact Termux/Android commands.
- Wait for my real output after each stage.
- Fix failures before continuing.
- Only print "${assistantName} STAGE <number>: PASS" after successful verification.
- Back up files before risky changes.
- Never ask for passwords, OTPs, UPI PINs or private API secrets.
- Do not claim one prompt instantly creates an APK.

Roadmap:
Foundation
AI brain
Personality
Voice I/O
Continuous conversation
Premium UI
Android app shell
Animated orb
Memory
Android actions
Wake word
Background service
Floating bubble
Notification awareness
Health/status
Settings
Error recovery
Performance
Privacy/security
APK build
Real-world test
Final v1

Start with Stage 1 only.`;

  return NextResponse.json({
    prompt,
    licenseId: String(licenses[0].license_id),
  });
}
