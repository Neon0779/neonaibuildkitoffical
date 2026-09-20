import Link from "next/link";

export default function ContactPage() {
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
            padding: "32px",
            border: "1px solid rgba(53,217,255,.22)",
            borderRadius: "24px",
            background: "rgba(255,255,255,.035)",
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

          <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
            Contact Us
          </h1>

          <p
            style={{
              color: "#b5c3ce",
              lineHeight: 1.8,
              maxWidth: "650px",
            }}
          >
            Need help with your NEON AI Build Kit purchase, payment,
            access or build workflow? Contact our support.
          </p>

          <div
            style={{
              marginTop: "30px",
              padding: "24px",
              borderRadius: "18px",
              border: "1px solid rgba(53,217,255,.18)",
              background: "rgba(53,217,255,.05)",
            }}
          >
            <p style={{ color: "#9fb0bf", margin: "0 0 8px" }}>
              WhatsApp Support
            </p>

            <h2 style={{ margin: "0 0 18px" }}>
              +91 89691 45622
            </h2>

            <a
              href="https://wa.me/918969145622?text=Hi%20NEON%20Labs%2C%20I%20need%20help%20with%20NEON%20AI%20Build%20Kit."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 22px",
                borderRadius: "12px",
                background: "#35d9ff",
                color: "#021015",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Chat on WhatsApp
            </a>
          </div>

          <Section title="Purchase Support">
            Contact us if you have a verified payment issue, duplicate
            payment, or difficulty receiving access to your purchased
            NEON AI Build Kit.
          </Section>

          <Section title="Technical Support">
            Customers may contact us for reasonable assistance related to
            the NEON AI Build Kit workflow and provided digital resources.
          </Section>

          <Section title="Security Notice">
            NEON Labs will never ask you to send your UPI PIN, OTP,
            banking password or other private authentication credentials
            through WhatsApp.
          </Section>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "30px" }}>
      <h2 style={{ fontSize: "21px", marginBottom: "10px" }}>
        {title}
      </h2>

      <p
        style={{
          color: "#b5c3ce",
          lineHeight: 1.8,
          margin: 0,
        }}
      >
        {children}
      </p>
    </section>
  );
}
