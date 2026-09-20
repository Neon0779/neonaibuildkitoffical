import Link from "next/link";

export default function AboutPage() {
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
            About Us
          </h1>

          <p
            style={{
              color: "#b5c3ce",
              lineHeight: 1.8,
              fontSize: "18px",
            }}
          >
            NEON Labs creates digital AI and Android development resources
            designed to make advanced technology projects easier to understand,
            build and personalize.
          </p>

          <Section title="What We Build">
            Our current product, NEON AI Build Kit, is a guided digital
            development resource for people who want to create and personalize
            their own Android AI assistant project.
          </Section>

          <Section title="How It Works">
            The build kit provides structured prompts, development guidance,
            workflows and technical resources. Customers can personalize
            elements such as their assistant&apos;s name, personality, voice
            preference, theme and conversation language while following the
            guided development process.
          </Section>

          <Section title="Our Goal">
            Our goal is to make practical AI and Android development more
            approachable by turning complex build processes into clear,
            structured steps that customers can follow and learn from.
          </Section>

          <Section title="Important Product Information">
            NEON AI Build Kit is a digital development resource, not a
            pre-installed finished AI assistant for every Android device.
            Features and compatibility can vary depending on the device,
            Android version, permissions, APIs and third-party services used
            during development.
          </Section>

          <Section title="Support">
            Customers can contact NEON Labs for purchase and product support
            through our official Contact Us page.
          </Section>

          <Link
            href="/contact"
            style={{
              display: "inline-block",
              marginTop: "30px",
              padding: "14px 22px",
              borderRadius: "12px",
              background: "#35d9ff",
              color: "#021015",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Contact NEON Labs
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
