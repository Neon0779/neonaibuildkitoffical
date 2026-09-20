import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return (
    aBuffer.length === bBuffer.length &&
    crypto.timingSafeEqual(aBuffer, bBuffer)
  );
}

async function verifyAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("neon_admin_session")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!session || !secret) return false;

  try {
    const [payloadEncoded, signature] = session.split(".");

    if (!payloadEncoded || !signature) return false;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadEncoded)
      .digest("hex");

    if (!safeEqual(signature, expectedSignature)) return false;

    const payload = JSON.parse(
      Buffer.from(payloadEncoded, "base64url").toString("utf8")
    );

    if (!payload?.exp || Date.now() > payload.exp) return false;

    return true;
  } catch {
    return false;
  }
}

const cards = [
  { label: "Total Revenue", value: "—" },
  { label: "Verified Payments", value: "—" },
  { label: "Buyers", value: "—" },
  { label: "Active Licenses", value: "—" },
];

export default async function AdminDashboard() {
  const authenticated = await verifyAdminSession();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="mb-10 flex flex-col gap-4 border-b border-cyan-400/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              NEON LABS
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              NEON AI Build Kit — secure owner control center
            </p>
          </div>

          <div className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
            ● Admin authenticated
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.label}
              className="rounded-2xl border border-cyan-400/10 bg-white/[0.035] p-5 shadow-[0_0_35px_rgba(34,211,238,0.03)] backdrop-blur"
            >
              <p className="text-sm text-slate-400">{card.label}</p>

              <p className="mt-3 text-3xl font-bold text-white">
                {card.value}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Database connection pending
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Payments</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Verified Razorpay payments will appear here.
                </p>
              </div>

              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                ₹99
              </span>
            </div>

            <EmptyState text="No payment records available yet." />
          </div>

          <div className="rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Buyers & Licenses</h2>
              <p className="mt-1 text-sm text-slate-500">
                Verified buyer access and licenses will appear here.
              </p>
            </div>

            <EmptyState text="No buyer/license records available yet." />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] to-blue-500/[0.02] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            System Status
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Admin authentication is active
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Payment statistics, buyers and license records will be connected
            to the NEON database in the next backend stage. No fake statistics
            are displayed.
          </p>
        </section>

        <footer className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-600">
          NEON LABS • Owner Administration
        </footer>
      </div>
    </main>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10 px-5 text-center">
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}
