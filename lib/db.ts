import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  return url;
}

export const sql = neon(getDatabaseUrl());

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS buyers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT,
      phone TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CHECK (email IS NOT NULL OR phone IS NOT NULL)
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS buyers_email_unique
    ON buyers (LOWER(email))
    WHERE email IS NOT NULL
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS buyers_phone_unique
    ON buyers (phone)
    WHERE phone IS NOT NULL
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY,
      buyer_id BIGINT REFERENCES buyers(id) ON DELETE SET NULL,
      provider_order_id TEXT UNIQUE NOT NULL,
      amount_paise INTEGER NOT NULL CHECK (amount_paise = 9900),
      currency TEXT NOT NULL DEFAULT 'INR',
      status TEXT NOT NULL DEFAULT 'created'
        CHECK (status IN ('created', 'paid', 'failed', 'cancelled')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS orders_buyer_id_idx
    ON orders (buyer_id)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id BIGSERIAL PRIMARY KEY,
      order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
      provider_payment_id TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL
        CHECK (status IN ('verified', 'failed', 'refunded')),
      verified_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS payments_order_id_idx
    ON payments (order_id)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS licenses (
      id BIGSERIAL PRIMARY KEY,
      buyer_id BIGINT NOT NULL REFERENCES buyers(id) ON DELETE RESTRICT,
      payment_id BIGINT UNIQUE NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
      license_id TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'revoked')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS licenses_buyer_id_idx
    ON licenses (buyer_id)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS webhook_events (
      id BIGSERIAL PRIMARY KEY,
      event_id TEXT UNIQUE NOT NULL,
      event_type TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return { ready: true };
}
