"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  async function startPayment() {
    try {
      setLoading(true);
      setMessage("");

      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error("Razorpay checkout could not load.");
      }

      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
        }),
      });

      const order = await response.json();

      if (!response.ok || !order.id) {
        throw new Error(order.error || "Could not create payment order.");
      }

      const razorpay = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "NEON LABS",
        description: "NEON AI Build Kit",
        order_id: order.id,

        handler: async function (paymentResponse: any) {
          try {
            setLoading(true);
            setMessage("Verifying payment...");

            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            const verification = await verifyResponse.json();

            if (!verifyResponse.ok || !verification.verified) {
              throw new Error(
                verification.error || "Payment verification failed."
              );
            }

            setMessage(
              "Payment verified successfully. Opening your NEON dashboard..."
            );

            window.location.href = verification.redirect || "/buyer";
          } catch (error) {
            console.error(error);

            setMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Access was not unlocked."
            );
          } finally {
            setLoading(false);
          }
        },

        theme: {
          color: "#39dfff",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      });

      razorpay.on("payment.failed", function () {
        setMessage("Payment failed. Please try again.");
        setLoading(false);
      });

      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="page">
      <nav>
        <div className="logo">
          NEON <span>LABS</span>
        </div>

        <div className="navBadge">ANDROID AI BUILD KIT</div>
      </nav>

      <section className="hero">
        <div className="offer">⚡ LAUNCH OFFER • ₹99</div>

        <h1>
          BUILD YOUR OWN
          <br />
          ANDROID <span>AI ASSISTANT</span>
        </h1>

        <p className="subtitle">
          Turn your Android phone into your own personalized AI assistant.
          Choose its name, personality, voice, theme and language — then follow
          the guided build workflow.
        </p>

        <div className="identityBox">
          <p className="identityTitle">BUYER ACCESS DETAILS</p>

          <div className="identityGrid">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <p className="identityHint">
            Enter at least one valid email or mobile number for your secure buyer access.
          </p>
        </div>

        <div className="actions">
          <button
            className="buy"
            onClick={startPayment}
            disabled={loading}
          >
            {loading ? "STARTING PAYMENT..." : "GET NEON AI KIT — ₹99"}
          </button>

          <a className="secondary" href="#features">
            EXPLORE FEATURES
          </a>
        </div>

        <div className="mini">
          No coding expertise required • Android + Termux • Guided step-by-step
        </div>

        {message && <div className="message">{message}</div>}

        <div className="core">
          <div className="coreInner">N</div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="eyebrow">YOUR ASSISTANT. YOUR RULES.</div>

        <h2>One kit. Your own AI identity.</h2>

        <p className="sectionIntro">
          NEON AI Build Kit guides you through building a personalized Android
          AI assistant instead of locking you into one fixed assistant name.
        </p>

        <div className="grid">
          <Card
            icon="✦"
            title="Custom Assistant"
            text="Choose your own assistant name, personality and conversation style."
          />

          <Card
            icon="◉"
            title="Voice Preference"
            text="Choose female, male or no preference depending on the voice provider you use."
          />

          <Card
            icon="⌁"
            title="Android + Termux"
            text="Follow exact commands and checkpoints while building directly with your Android workflow."
          />

          <Card
            icon="◆"
            title="Master Prompt"
            text="Start a structured AI-guided build workflow instead of relying on random coding instructions."
          />

          <Card
            icon="✓"
            title="Stage Verification"
            text="Verify each build stage before moving forward so errors can be fixed early."
          />

          <Card
            icon="⚙"
            title="Future Ready"
            text="A modular foundation for memory, voice, Android actions, wake features and more."
          />
        </div>
      </section>

      <section className="workflow">
        <div className="eyebrow">HOW IT WORKS</div>

        <h2>From idea to your Android AI assistant.</h2>

        <div className="steps">
          <Step
            n="01"
            title="Get the Kit"
            text="Start with the ₹99 launch-access checkout."
          />

          <Step
            n="02"
            title="Personalize"
            text="Choose your assistant name, personality, voice, theme and language."
          />

          <Step
            n="03"
            title="Use the Master Prompt"
            text="Paste your personalized prompt into a capable coding AI."
          />

          <Step
            n="04"
            title="Build Stage-by-Stage"
            text="Follow Termux commands, verification checkpoints and troubleshooting."
          />
        </div>
      </section>

      <section className="cta">
        <div>
          <div className="eyebrow">LAUNCH ACCESS</div>

          <h2>Build something that is yours.</h2>

          <p>Start the NEON AI guided Android assistant build workflow.</p>
        </div>

        <button
          className="buy big"
          onClick={startPayment}
          disabled={loading}
        >
          {loading ? "STARTING..." : "GET ACCESS — ₹99"}
        </button>
      </section>

      <footer>
        <div className="footerBrand">
          <strong>© 2026 NEON LABS</strong>

          <div className="footerTagline">
            Build AI • Build Apps • Build the Future
          </div>
        </div>

        <div className="footerLinks">
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/pricing">Pricing</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/cancellation-refund-policy">
            Cancellation & Refund Policy
          </a>
        </div>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 15%,
              rgba(26, 179, 255, 0.12),
              transparent 32%
            ),
            radial-gradient(
              circle at 80% 55%,
              rgba(80, 55, 255, 0.08),
              transparent 30%
            ),
            #02070b;
          color: #f4fbff;
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        nav {
          width: min(1180px, calc(100% - 40px));
          margin: auto;
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(121, 220, 255, 0.12);
        }

        .logo {
          font-weight: 900;
          letter-spacing: 4px;
          font-size: 14px;
        }

        .logo span,
        h1 span {
          color: #3ddcff;
        }

        .navBadge,
        .eyebrow {
          color: #8aa1ae;
          letter-spacing: 2px;
          font-size: 10px;
          font-weight: 800;
        }

        .hero {
          width: min(1050px, calc(100% - 36px));
          margin: auto;
          padding: 90px 0 55px;
          text-align: center;
          position: relative;
        }

        .offer {
          display: inline-block;
          padding: 9px 16px;
          border: 1px solid rgba(61, 220, 255, 0.28);
          border-radius: 100px;
          color: #6ee8ff;
          background: rgba(61, 220, 255, 0.06);
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 800;
        }

        h1 {
          margin: 30px auto 20px;
          font-size: clamp(42px, 8vw, 82px);
          line-height: 0.98;
          letter-spacing: -3px;
          font-weight: 950;
        }

        .subtitle {
          width: min(720px, 100%);
          margin: 0 auto;
          color: #93a4ae;
          line-height: 1.8;
          font-size: 15px;
        }

        .identityBox {
          width: min(620px, 100%);
          margin: 30px auto 0;
          padding: 18px;
          border: 1px solid rgba(61, 220, 255, 0.16);
          border-radius: 14px;
          background: rgba(5, 16, 22, 0.8);
        }

        .identityTitle {
          margin: 0 0 12px;
          color: #63e9ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.6px;
        }

        .identityGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .identityGrid input {
          width: 100%;
          min-height: 46px;
          padding: 0 14px;
          border: 1px solid #17313b;
          border-radius: 9px;
          outline: none;
          background: #030b0f;
          color: #f4fbff;
          font-size: 13px;
        }

        .identityGrid input:focus {
          border-color: #39dfff;
        }

        .identityHint {
          margin: 10px 0 0;
          color: #607680;
          font-size: 10px;
          line-height: 1.5;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        button,
        .secondary {
          border: 0;
          border-radius: 8px;
          min-height: 50px;
          padding: 0 24px;
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .buy {
          color: #001015;
          background: linear-gradient(135deg, #6cecff, #24c9f4);
          box-shadow: 0 0 34px rgba(52, 215, 255, 0.2);
        }

        .buy:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .secondary {
          color: #c8d8df;
          border: 1px solid #18303a;
          background: #071016;
        }

        .mini {
          margin-top: 17px;
          color: #536771;
          font-size: 10px;
        }

        .message {
          width: min(620px, 100%);
          margin: 22px auto 0;
          padding: 14px 18px;
          border: 1px solid rgba(61, 220, 255, 0.22);
          border-radius: 10px;
          background: rgba(61, 220, 255, 0.06);
          color: #a9edf8;
          font-size: 13px;
          line-height: 1.6;
        }

        .core {
          width: 150px;
          height: 150px;
          margin: 70px auto 0;
          padding: 1px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38e4ff, #315bff, #9d3cff);
          box-shadow: 0 0 65px rgba(47, 205, 255, 0.25);
        }

        .coreInner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: radial-gradient(circle, #102b39, #03090d 68%);
          font-size: 48px;
          font-weight: 900;
          color: #63e9ff;
        }

        .section,
        .workflow {
          width: min(1120px, calc(100% - 36px));
          margin: auto;
          padding: 100px 0;
        }

        .section h2,
        .workflow h2,
        .cta h2 {
          margin: 12px 0;
          font-size: clamp(32px, 5vw, 54px);
          letter-spacing: -2px;
        }

        .sectionIntro {
          max-width: 700px;
          color: #7f929d;
          line-height: 1.8;
        }

        .grid {
          margin-top: 45px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .card {
          min-height: 205px;
          padding: 28px;
          border: 1px solid #102832;
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(10, 24, 31, 0.9),
            rgba(4, 10, 14, 0.92)
          );
        }

        .cardIcon {
          font-size: 25px;
          color: #4be1ff;
        }

        .card h3 {
          margin: 22px 0 10px;
          font-size: 18px;
        }

        .card p,
        .step p,
        .cta p {
          color: #81949e;
          line-height: 1.7;
          font-size: 13px;
        }

        .workflow {
          border-top: 1px solid #0d2028;
        }

        .steps {
          margin-top: 45px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .step {
          padding: 26px 22px;
          border-left: 1px solid #1c4655;
        }

        .stepNum {
          color: #41dcff;
          font-weight: 900;
          font-size: 12px;
        }

        .step h3 {
          margin: 16px 0 8px;
        }

        .cta {
          width: min(1120px, calc(100% - 36px));
          margin: 30px auto 90px;
          padding: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          border: 1px solid #153540;
          border-radius: 22px;
          background:
            radial-gradient(
              circle at 90% 50%,
              rgba(44, 208, 255, 0.12),
              transparent 35%
            ),
            #061016;
        }

        .big {
          min-width: 210px;
        }

        footer {
          width: min(1120px, calc(100% - 36px));
          margin: auto;
          padding: 30px 0 45px;
          border-top: 1px solid #10232b;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
          color: #52646d;
          font-size: 11px;
        }

        .footerTagline {
          margin-top: 10px;
          white-space: nowrap;
        }

        .footerLinks {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 12px 20px;
          max-width: 650px;
        }

        .footerLinks a {
          color: #7f929d;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footerLinks a:hover {
          color: #41dcff;
        }

        @media (max-width: 800px) {
          nav {
            height: 68px;
          }

          .navBadge {
            font-size: 8px;
          }

          .hero {
            padding-top: 65px;
          }

          h1 {
            letter-spacing: -2px;
          }

          .identityGrid {
            grid-template-columns: 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .cta {
            padding: 30px 22px;
            flex-direction: column;
            align-items: flex-start;
          }

          .big {
            width: 100%;
          }

          footer {
            flex-direction: column;
          }

          .footerLinks {
            justify-content: flex-start;
            line-height: 1.8;
          }
        }
      `}</style>
    </main>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="card">
      <div className="cardIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({
  n,
  title,
  text,
}: {
  n: string;
  title: string;
  text: string;
}) {
  return (
    <div className="step">
      <div className="stepNum">{n}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
