import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { initializeDatabase, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const authenticated = await getAdminSession();

  if (!authenticated) {
    redirect("/admin/login");
  }

  await initializeDatabase();

  const [payments, buyers, licenses, revenue, recent] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM payments WHERE status = 'verified'`,
    sql`SELECT COUNT(*)::int AS count FROM buyers`,
    sql`SELECT COUNT(*)::int AS count FROM licenses WHERE status = 'active'`,
    sql`
      SELECT COALESCE(SUM(o.amount_paise), 0)::bigint AS total
      FROM payments p
      JOIN orders o ON o.id = p.order_id
      WHERE p.status = 'verified'
    `,
    sql`
      SELECT
        p.provider_payment_id,
        p.status,
        p.verified_at,
        o.provider_order_id,
        o.amount_paise
      FROM payments p
      JOIN orders o ON o.id = p.order_id
      ORDER BY p.created_at DESC
      LIMIT 10
    `,
  ]);

  const cards = [
    {
      label: "Total Revenue",
      value: `₹${(Number(revenue[0]?.total || 0) / 100).toFixed(0)}`,
    },
    {
      label: "Verified Payments",
      value: String(payments[0]?.count || 0),
    },
    {
      label: "Buyers",
      value: String(buyers[0]?.count || 0),
    },
    {
      label: "Active Licenses",
      value: String(licenses[0]?.count || 0),
    },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <header className="mb-10 border-b border-cyan-400/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
            NEON LABS
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Live NEON AI Build Kit sales and access data
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.label}
              className="rounded-2xl border border-cyan-400/10 bg-white/[0.035] p-5"
            >
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-3 text-3xl font-bold">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">Recent Payments</h2>

          <div className="mt-5 space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-slate-500">
                No verified payments yet.
              </p>
            ) : (
              recent.map((item) => (
                <div
                  key={String(item.provider_payment_id)}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm"
                >
                  <p className="text-cyan-300">
                    ₹{Number(item.amount_paise) / 100}
                  </p>
                  <p className="mt-1 text-slate-400">
                    Payment: {String(item.provider_payment_id)}
                  </p>
                  <p className="text-slate-500">
                    Order: {String(item.provider_order_id)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
