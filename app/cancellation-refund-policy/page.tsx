import Link from "next/link";

export default function CancellationRefundPolicy() {
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
            Cancellation & Refund Policy
          </h1>

          <p style={{ color: "#9fb0bf" }}>
            Last updated: September 20, 2026
          </p>

          <Section title="1. Digital Product">
            NEON AI Build Kit is a digital product. It may include digital
            instructions, prompts, guided workflows, technical resources and
            access to related digital materials.
          </Section>

          <Section title="2. Order Cancellation">
            Because digital products can be delivered or made accessible
            shortly after successful payment verification, an order generally
            cannot be cancelled after digital access has been provided.
          </Section>

          <Section title="3. Refund Eligibility">
            Refund requests may be reviewed when there is a verified duplicate
            payment, an incorrect charge attributable to our payment flow, or
            when payment has been successfully verified but the purchased
            digital access cannot be provided and the issue cannot be resolved
            through support.
          </Section>

          <Section title="4. Change of Mind">
            Refunds are generally not provided solely because a customer
            changes their mind after receiving access to the digital product or
            purchased materials.
          </Section>

          <Section title="5. Technical Compatibility">
            Customers should review the product requirements before purchase.
            Android versions, devices, third-party APIs, AI providers and
            software environments can differ. Compatibility issues will first
            be handled through reasonable troubleshooting and support.
          </Section>

          <Section title="6. Duplicate Payments">
            If you believe you were charged more than once for the same order,
            contact us with the relevant transaction details. We will review
            the payment records and, where a duplicate charge is verified,
            arrange an appropriate resolution.
          </Section>

          <Section title="7. Failed Payments">
            A payment shown as failed or pending does not automatically mean
            that funds were successfully received by NEON Labs. Payment status
            will be checked against available payment-provider records before
            any refund or access decision is made.
          </Section>

          <Section title="8. Refund Request">
            To request review of an eligible payment issue, contact NEON Labs
            via WhatsApp at +91 89691 45622 and provide sufficient order or
            transaction information to identify the purchase. Never send your
            UPI PIN, OTP, banking password or other authentication credentials.
          </Section>

          <Section title="9. Review and Processing">
            Refund requests are reviewed based on the payment and order
            records available to us. If a refund is approved, processing and
            settlement times may also depend on the payment provider and the
            customer&apos;s bank or payment method.
          </Section>

          <Section title="10. Contact">
            For cancellation, refund or payment-related support, contact NEON
            Labs via WhatsApp at +91 89691 45622.
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
