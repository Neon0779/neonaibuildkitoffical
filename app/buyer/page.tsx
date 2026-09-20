import { redirect } from "next/navigation";
import { initializeDatabase, sql } from "@/lib/db";
import { getBuyerSession } from "@/lib/session";
import BuyerDashboard from "./buyer-dashboard";

export const dynamic = "force-dynamic";

export default async function BuyerPage() {
  const session = await getBuyerSession();

  if (!session) {
    redirect("/");
  }

  await initializeDatabase();

  const licenses = await sql`
    SELECT license_id, status
    FROM licenses
    WHERE buyer_id = ${session.buyerId}
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (!licenses.length || licenses[0].status !== "active") {
    redirect("/");
  }

  return (
    <BuyerDashboard
      licenseId={String(licenses[0].license_id)}
    />
  );
}
