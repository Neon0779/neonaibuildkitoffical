import Link from "next/link";

export default function PricingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#05070b",
        color: "#eaf7ff",
        padding: "48px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#35d9ff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Back to NEON AI
        </Link>

        <div
          style={{
            marginTop: "28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#35d9ff",
              fontWeight: 800,
              letterSpacing: "2px",
            }}
          >
            NEON LABS
          </p>

          <h1
            style={{
              fontSize: "44px",
              margin: "10px 0",
            }}
          >
            Simple Pricing
          </h1>

          <p
            style={{
              color: "#9fb0bf",
              lineHeight: 1.7,
            }}
          >
            Start building and personalizing your own Android AI
            assistant with the NEON AI Build Kit.
          </p>
        </div>

        <div
          style={{
            maxWidth: "560px",
            margin: "40px auto 0",
            padding: "34px",
            borderRadius: "26px",
            border: "1px solid rgba(53,217,255,.35)",
            background:
              "linear-gradient(180deg, rgba(53,217,255,.09), rgba(255,255,255,.025))",
            boxShadow: "0 0 50px rgba(53,217,255,.08)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "rgba(53,217,255,.12)",
              color: "#35d9ff",
              fontWeight: 800,
              fontSize: "13px",
            }}
          >
            LAUNCH OFFER
          </div>

          <h2
            style={{
              fontSize: "27px",
              marginBottom: "8px",
            }}
          >
            NEON AI Build Kit
          </h2>

          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              margin: "18px 0",
            }}
          >
            ₹99
          </div>

          <p style={{ color: "#9fb0bf" }}>
            One-time purchase for the NEON AI Build Kit digital
            resources currently included with this offer.
          </p>

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,.1)",
              margin: "26px 0",
            }}
          />

          <Feature text="Guided Android AI assistant build workflow" />
          <Feature text="Personalized Master Prompt" />
          <Feature text="Custom assistant name" />
          <Feature text="Personality customization" />
          <Feature text="Voice preference customization" />
          <Feature text="Theme customization" />
          <Feature text="Hindi, Hinglish or English preference" />
          <Feature text="Structured Termux development guidance" />
          <Feature text="Build checkpoints and troubleshooting guidance" />

          <Link
            href="/"
            style={{
              display: "block",
              marginTop: "30px",
              padding: "16px 20px",
              borderRadius: "14px",
              background: "#35d9ff",
              color: "#021015",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "17px",
            }}
          >
            Get NEON AI Build Kit — ₹99
          </Link>

          <p
            style={{
              color: "#70818e",
              fontSize: "13px",
              lineHeight: 1.6,
              marginTop: "18px",
              textAlign: "center",
            }}
          >
            This is a digital development resource. Device,
            Android-version and third-party service compatibility may
            vary. Review our Terms and Refund Policy before purchase.
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            lineHeight: 2,
          }}
        >
          <Link
            href="/terms-and-conditions"
            style={{ color: "#8fa4b3", margin: "0 10px" }}
          >
            Terms & Conditions
          </Link>

          <Link
            href="/cancellation-refund-policy"
            style={{ color: "#8fa4b3", margin: "0 10px" }}
          >
            Refund Policy
          </Link>

          <Link
            href="/contact"
            style={{ color: "#8fa4b3", margin: "0 10px" }}
          >
            Contact Us
          </Link>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#667785",
            marginTop: "28px",
          }}
        >
          © 2026 NEON Labs. All rights reserved.
        </p>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <p
      style={{
        color: "#c7d5df",
        lineHeight: 1.6,
        margin: "13px 0",
      }}
    >
      <span
        style={{
          color: "#35d9ff",
          fontWeight: 900,
          marginRight: "10px",
        }}
      >
        ✓
      </span>
      {text}
    </p>
  );
}
