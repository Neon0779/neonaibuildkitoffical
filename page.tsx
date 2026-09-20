import Link from "next/link";

export default function PrivacyPolicy() {
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
              marginBottom: "10px",
            }}
          >
            NEON LABS
          </p>

          <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>
            Privacy Policy
          </h1>

          <p style={{ color: "#9fb0bf" }}>
            Last updated: September 20, 2026
          </p>

          <Section title="1. Introduction">
            NEON Labs operates the NEON AI Build Kit website. This Privacy
            Policy explains how information may be collected, used and
            protected when you visit our website or purchase our digital
            product.
          </Section>

          <Section title="2. Information We May Collect">
            We may collect information you provide during a purchase or support
            request, such as your name, contact information and payment-related
            transaction identifiers. We may also receive basic technical
            information required to operate and secure the website.
          </Section>

          <Section title="3. Payments">
            Payments may be processed through third-party payment providers
            such as Razorpay. Payment information is handled according to the
            payment provider&apos;s systems and policies. We do not ask
            customers to share UPI PINs, OTPs or banking passwords with us.
          </Section>

          <Section title="4. How We Use Information">
            Information may be used to process and verify purchases, provide
            access to purchased digital resources, provide customer support,
            prevent misuse or fraud, maintain website security and improve our
            services.
          </Section>

          <Section title="5. Data Sharing">
            We do not sell customers&apos; personal information. Information
            may be shared with service providers when reasonably necessary to
            process payments, operate the website, provide purchased services,
            comply with applicable law or protect our service from abuse.
          </Section>

          <Section title="6. Data Security">
            We take reasonable measures to protect information associated with
            our service. However, no online service or method of electronic
            storage can guarantee absolute security.
          </Section>

          <Section title="7. Cookies and Technical Data">
            The website or services used to operate it may use cookies or
            similar technologies where necessary for functionality, security,
            sessions and basic website operation.
          </Section>

          <Section title="8. Third-Party Services">
            Our website may use third-party infrastructure or payment services.
            Those services may process information according to their own
            privacy policies and applicable terms.
          </Section>

          <Section title="9. Customer Choices">
            Customers may contact us regarding questions about personal
            information associated with their purchase. Requests will be
            handled subject to applicable legal, security and record-keeping
            requirements.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy when our website, services or
            legal requirements change. The latest version will be published on
            this page with an updated date.
          </Section>

          <Section title="11. Contact">
            For privacy or purchase-related questions, contact NEON Labs via
            WhatsApp at +91 89691 45622.
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
      <h2
        style={{
          fontSize: "21px",
          marginBottom: "10px",
          color: "#ffffff",
        }}
      >
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
