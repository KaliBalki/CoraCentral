import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function GET() {
  try {
    const players = await query({
      query: `
        SELECT
          p.playerID,
          p.naam,
          p.geboortedatum,
          p.land,
          t.teamnaam AS teamName
        FROM tblPlayer p
        LEFT JOIN tblTeam t
          ON p.teamID = t.teamID
      `,
    });
    return NextResponse.json(players);
  } catch (err) {
    console.error("/api/players GET error:", err);
    return NextResponse.json(
      { error: "Kon spelers niet ophalen." },
      { status: 500 }
    );
  }
}
