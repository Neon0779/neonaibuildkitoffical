"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function login(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Login failed.");
      }

      window.location.href = "/admin";
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="loginCard">
        <div className="brand">NEON LABS</div>

        <div className="badge">SECURE ADMIN</div>

        <h1>Admin Panel</h1>

        <p>
          Sign in to manage NEON AI orders, buyers,
          licenses and sales.
        </p>

        <form onSubmit={login}>
          <label>Admin Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "VERIFYING..." : "LOGIN TO ADMIN"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}

        <div className="security">
          🔒 Protected NEON Labs administration area
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          padding: 24px;
          display: grid;
          place-items: center;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(53, 217, 255, 0.13),
              transparent 32%
            ),
            #02070b;
          color: #f4fbff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .loginCard {
          width: min(440px, 100%);
          padding: 34px 28px;
          border: 1px solid rgba(53, 217, 255, 0.22);
          border-radius: 24px;
          background: rgba(7, 16, 22, 0.94);
          box-shadow: 0 0 60px rgba(53, 217, 255, 0.08);
        }

        .brand {
          color: #35d9ff;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .badge {
          display: inline-block;
          margin-top: 26px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(53, 217, 255, 0.08);
          color: #68e5ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        h1 {
          margin: 16px 0 10px;
          font-size: 38px;
          letter-spacing: -1.5px;
        }

        p {
          color: #8297a3;
          line-height: 1.7;
          font-size: 14px;
        }

        form {
          margin-top: 28px;
        }

        label {
          display: block;
          margin-bottom: 9px;
          color: #a9bbc5;
          font-size: 12px;
          font-weight: 700;
        }

        input {
          width: 100%;
          height: 52px;
          padding: 0 15px;
          border: 1px solid #17323d;
          border-radius: 10px;
          outline: none;
          background: #040b0f;
          color: white;
          font-size: 15px;
        }

        input:focus {
          border-color: #35d9ff;
        }

        button {
          width: 100%;
          min-height: 52px;
          margin-top: 14px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #6cecff, #24c9f4);
          color: #001015;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
        }

        .message {
          margin-top: 16px;
          padding: 12px;
          border: 1px solid rgba(255, 100, 100, 0.25);
          border-radius: 9px;
          color: #ffabab;
          font-size: 12px;
        }

        .security {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #10232b;
          color: #536771;
          text-align: center;
          font-size: 10px;
        }
      `}</style>
    </main>
  );
}
