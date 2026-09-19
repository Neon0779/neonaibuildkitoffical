"use client";

import { useState } from "react";

export default function Home() {
  const [showBuy, setShowBuy] = useState(false);

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          NEON<span style={{ color: "#38e8ff" }}> LABS</span>
        </div>
        <div style={styles.badge}>ANDROID AI BUILD KIT</div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.pill}>⚡ LAUNCH OFFER • ₹99</div>

        <h1 style={styles.title}>
          BUILD YOUR OWN
          <br />
          <span style={styles.gradient}>ANDROID AI ASSISTANT</span>
        </h1>

        <p style={styles.subtitle}>
          Turn your Android phone into your own personalized AI assistant.
          Choose its name, personality, voice, theme and language — then follow
          the guided build workflow.
        </p>

        <div style={styles.buttons}>
          <button style={styles.primary} onClick={() => setShowBuy(true)}>
            GET NEON AI KIT — ₹99 →
          </button>

          <a href="#features" style={styles.secondary}>
            EXPLORE FEATURES
          </a>
        </div>

        <p style={styles.small}>
          No coding expertise required • Android + Termux • Guided step-by-step
        </p>
      </section>

      <section style={styles.core}>
        <div style={styles.orb}>
          <div style={styles.orbInner}>N</div>
        </div>

        <div style={styles.status}>● AI CORE ONLINE</div>
        <h2 style={styles.coreTitle}>Your AI. Your Identity.</h2>
        <p style={styles.coreText}>
          Create an assistant designed around you instead of using a fixed
          identity.
        </p>
      </section>

      <section id="features" style={styles.section}>
        <p style={styles.eyebrow}>WHAT YOU GET</p>
        <h2 style={styles.heading}>One kit. Complete build journey.</h2>

        <div style={styles.grid}>
          {[
            ["01", "Personalized AI", "Choose your assistant name and personality."],
            ["02", "Voice Experience", "Configure your preferred male or female voice."],
            ["03", "Termux Build", "Follow exact commands and verified build stages."],
            ["04", "Android Actions", "Build toward useful phone actions with permissions."],
            ["05", "Memory System", "Create structured assistant memory and preferences."],
            ["06", "Premium Interface", "Build a futuristic assistant UI with an AI core."],
          ].map(([num, title, text]) => (
            <article style={styles.card} key={num}>
              <span style={styles.number}>{num}</span>
              <h3 style={styles.cardTitle}>{title}</h3>
              <p style={styles.cardText}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.workflow}>
        <p style={styles.eyebrow}>HOW IT WORKS</p>
        <h2 style={styles.heading}>From ₹99 to your own AI build.</h2>

        <div style={styles.steps}>
          <div style={styles.step}><b>1</b><span>Get the Build Kit</span></div>
          <div style={styles.line} />
          <div style={styles.step}><b>2</b><span>Unlock Buyer Dashboard</span></div>
          <div style={styles.line} />
          <div style={styles.step}><b>3</b><span>Customize Your Assistant</span></div>
          <div style={styles.line} />
          <div style={styles.step}><b>4</b><span>Copy Master Prompt</span></div>
          <div style={styles.line} />
          <div style={styles.step}><b>5</b><span>Start Guided Build</span></div>
        </div>
      </section>

      <section style={styles.cta}>
        <div>
          <p style={styles.eyebrow}>LAUNCH ACCESS</p>
          <h2 style={styles.ctaTitle}>Start building your AI assistant.</h2>
          <p style={styles.oldPrice}>₹499</p>
          <div style={styles.price}>₹99</div>
          <p style={styles.once}>Launch price</p>

          <button style={styles.primary} onClick={() => setShowBuy(true)}>
            BUY NOW — ₹99 →
          </button>
        </div>
      </section>

      <footer style={styles.footer}>
        <strong>NEON LABS</strong>
        <span>Build AI • Build Apps • Build the Future</span>
        <span>© 2026 NEON LABS</span>
      </footer>

      {showBuy && (
        <div style={styles.overlay} onClick={() => setShowBuy(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowBuy(false)}
              style={styles.close}
            >
              ×
            </button>

            <div style={styles.modalIcon}>N</div>
            <p style={styles.eyebrow}>NEON AI BUILD KIT</p>
            <h2 style={styles.modalTitle}>Get Launch Access</h2>

            <div style={styles.modalPrice}>₹99</div>

            <p style={styles.modalText}>
              Secure payment activation is being connected. Your purchase will
              unlock the protected Buyer Dashboard and personalized Master
              Prompt.
            </p>

            <button style={styles.disabled}>
              PAYMENT SETUP IN PROGRESS
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 50% 10%, #08263a 0%, #03080e 32%, #010305 70%)",
    color: "#f5fbff",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 6%",
    borderBottom: "1px solid rgba(255,255,255,.08)",
  },

  logo: {
    fontSize: "20px",
    fontWeight: 900,
    letterSpacing: "2px",
  },

  badge: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: "#8ea4b3",
  },

  hero: {
    minHeight: "75vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "70px 6%",
  },

  pill: {
    border: "1px solid rgba(56,232,255,.35)",
    background: "rgba(56,232,255,.07)",
    color: "#62efff",
    borderRadius: "100px",
    padding: "9px 15px",
    fontSize: "11px",
    letterSpacing: "1px",
    marginBottom: "28px",
  },

  title: {
    fontSize: "clamp(42px,8vw,90px)",
    lineHeight: ".95",
    letterSpacing: "-4px",
    maxWidth: "1100px",
    margin: 0,
    fontWeight: 900,
  },

  gradient: {
    background: "linear-gradient(90deg,#ffffff,#35e8ff,#587bff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    maxWidth: "720px",
    color: "#9eb0bd",
    fontSize: "17px",
    lineHeight: 1.7,
    margin: "30px auto",
  },

  buttons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  primary: {
    border: 0,
    background: "#35e8ff",
    color: "#001016",
    padding: "17px 24px",
    borderRadius: "10px",
    fontWeight: 900,
    cursor: "pointer",
  },

  secondary: {
    border: "1px solid #263844",
    color: "#dceaf1",
    padding: "16px 24px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
  },

  small: {
    color: "#5f7684",
    fontSize: "12px",
    marginTop: "22px",
  },

  core: {
    textAlign: "center",
    padding: "50px 6% 100px",
  },

  orb: {
    width: "150px",
    height: "150px",
    margin: "0 auto 30px",
    borderRadius: "50%",
    padding: "2px",
    background: "linear-gradient(135deg,#35e8ff,#295cff,#9b46ff)",
    boxShadow: "0 0 70px rgba(53,232,255,.25)",
  },

  orbInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 30%,#183d52,#02060a 65%)",
    display: "grid",
    placeItems: "center",
    fontSize: "48px",
    fontWeight: 900,
    color: "#53edff",
  },

  status: {
    color: "#4deaff",
    fontSize: "10px",
    letterSpacing: "2px",
  },

  coreTitle: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  coreText: {
    color: "#8195a3",
  },

  section: {
    padding: "90px 6%",
    maxWidth: "1200px",
    margin: "auto",
  },

  eyebrow: {
    color: "#44eaff",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: 800,
  },

  heading: {
    fontSize: "clamp(32px,5vw,55px)",
    margin: "10px 0 45px",
    letterSpacing: "-2px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "14px",
  },

  card: {
    border: "1px solid #142530",
    borderRadius: "16px",
    padding: "28px",
    background: "rgba(7,16,23,.8)",
  },

  number: {
    color: "#3ceaff",
    fontSize: "12px",
  },

  cardTitle: {
    fontSize: "20px",
    marginTop: "28px",
  },

  cardText: {
    color: "#8194a1",
    lineHeight: 1.6,
  },

  workflow: {
    padding: "100px 6%",
    textAlign: "center",
  },

  steps: {
    maxWidth: "700px",
    margin: "auto",
  },

  step: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    border: "1px solid #142832",
    background: "#061016",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
  },

  line: {
    width: "1px",
    height: "18px",
    background: "#1f6472",
    margin: "0 0 0 29px",
  },

  cta: {
    margin: "60px 6%",
    padding: "70px 25px",
    borderRadius: "25px",
    border: "1px solid rgba(54,230,255,.25)",
    background:
      "radial-gradient(circle at center,rgba(27,107,138,.28),rgba(3,8,13,.9))",
    textAlign: "center",
  },

  ctaTitle: {
    fontSize: "clamp(30px,5vw,55px)",
    margin: "10px",
  },

  oldPrice: {
    color: "#627681",
    textDecoration: "line-through",
    marginBottom: 0,
  },

  price: {
    fontSize: "70px",
    fontWeight: 900,
    color: "#48ebff",
  },

  once: {
    color: "#8095a0",
    marginTop: "-5px",
    marginBottom: "25px",
  },

  footer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "15px",
    color: "#637985",
    borderTop: "1px solid #101e25",
    padding: "35px 6%",
    fontSize: "12px",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.82)",
    backdropFilter: "blur(12px)",
    display: "grid",
    placeItems: "center",
    padding: "20px",
    zIndex: 100,
  },

  modal: {
    width: "100%",
    maxWidth: "430px",
    background: "#061016",
    border: "1px solid #1c5663",
    borderRadius: "22px",
    padding: "35px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 0 80px rgba(44,220,255,.15)",
  },

  close: {
    position: "absolute",
    right: "18px",
    top: "14px",
    border: 0,
    background: "transparent",
    color: "#91a8b5",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalIcon: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 22px",
    background: "#37e8ff",
    color: "#001014",
    fontSize: "28px",
    fontWeight: 900,
  },

  modalTitle: {
    fontSize: "30px",
  },

  modalPrice: {
    fontSize: "55px",
    fontWeight: 900,
    color: "#42eaff",
  },

  modalText: {
    color: "#8fa3af",
    lineHeight: 1.6,
  },

  disabled: {
    width: "100%",
    marginTop: "15px",
    padding: "16px",
    border: "1px solid #24404b",
    borderRadius: "10px",
    background: "#0d1b22",
    color: "#77909c",
    fontWeight: 800,
  },
};
