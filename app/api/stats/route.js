import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function GET() {
  try {
    const [stats] = await query({
      query: `
        SELECT
          (SELECT COUNT(*) FROM tblTicket)          AS totalTickets,
          (SELECT COUNT(*) FROM tblKlanten)         AS totalCustomers,
          (SELECT COUNT(*) FROM tblKlanten WHERE admin = 1) AS totalAdmins
      `,
    });

    return NextResponse.json({
      totalTickets: stats.totalTickets,
      totalCustomers: stats.totalCustomers,
      totalAdmins: stats.totalAdmins,
    });
  } catch (err) {
    console.error("/api/stats GET error:", err);
    return NextResponse.json(
      { error: "Kon statistieken niet ophalen." },
      { status: 500 }
    );
  }
}
