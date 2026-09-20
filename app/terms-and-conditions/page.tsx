import Link from "next/link";

export default function TermsAndConditions() {
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
            Terms & Conditions
          </h1>

          <p style={{ color: "#9fb0bf" }}>
            Last updated: September 20, 2026
          </p>

          <Section title="1. Acceptance of Terms">
            By accessing this website or purchasing the NEON AI Build Kit, you
            agree to these Terms & Conditions. Please review them before making
            a purchase.
          </Section>

          <Section title="2. About the Product">
            NEON AI Build Kit is a digital development resource designed to
            help customers create and personalize an Android AI assistant
            project. It may include guided workflows, prompts, instructions,
            technical resources and related digital materials.
          </Section>

          <Section title="3. Product Price">
            The current launch price displayed for the NEON AI Build Kit is
            ₹99. The applicable price is the price shown on the website at the
            time an order is placed. Prices may be updated for future orders.
          </Section>

          <Section title="4. Payments">
            Payments may be processed using third-party payment providers such
            as Razorpay. Access to purchased resources may be activated after
            successful payment verification.
          </Section>

          <Section title="5. Digital Product Access">
            This is a digital product. Access may be provided through a buyer
            dashboard, account, license or another secure delivery method made
            available by NEON Labs.
          </Section>

          <Section title="6. Customer Responsibilities">
            Customers are responsible for following the provided instructions,
            maintaining the security of their accounts and credentials, and
            using the product and any resulting software in accordance with
            applicable laws and platform requirements.
          </Section>

          <Section title="7. Third-Party Services">
            Building or operating an AI assistant may require third-party
            software, APIs, AI providers, Android services or other tools.
            Availability, pricing, limits and policies of those third-party
            services are controlled by their respective providers.
          </Section>

          <Section title="8. No Guaranteed Results">
            Results can vary depending on the customer&apos;s device, Android
            version, technical setup, third-party services, permissions and
            implementation choices. Purchase does not guarantee that every
            feature will work on every device or configuration.
          </Section>

          <Section title="9. Intellectual Property">
            NEON Labs branding, original website content and original digital
            materials provided with the product may not be resold, copied or
            redistributed as another commercial build kit without permission.
            Customers may use the purchased resources to work on their own
            projects subject to these terms.
          </Section>

          <Section title="10. Prohibited Use">
            The product must not be used for unlawful activity, unauthorized
            access, fraud, harmful surveillance, credential theft or other
            misuse that violates applicable law or third-party rights.
          </Section>

          <Section title="11. Service Changes">
            We may update the website, product documentation, build workflow or
            supported integrations as the underlying technologies and platform
            requirements change.
          </Section>

          <Section title="12. Refunds and Cancellations">
            Refund and cancellation requests are governed by the separate
            Cancellation & Refund Policy published on this website.
          </Section>

          <Section title="13. Privacy">
            Information associated with use of this website is handled
            according to our Privacy Policy.
          </Section>

          <Section title="14. Contact">
            For product, payment or support questions, contact NEON Labs via
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
