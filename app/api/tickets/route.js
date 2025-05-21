import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function GET() {
  try {
    const tickets = await query({
      query: `
        SELECT
          t.ticketID,
          t.naam,
          t.prijs,
          t.aantal,
          v.veld AS veldNaam
        FROM tblTicket t
        LEFT JOIN tblVelden v
          ON t.veldID = v.veldID
      `,
    });
    return NextResponse.json(tickets);
  } catch (err) {
    console.error("/api/tickets GET error:", err);
    return NextResponse.json(
      { error: "Kon tickets niet ophalen." },
      { status: 500 }
    );
  }
}
