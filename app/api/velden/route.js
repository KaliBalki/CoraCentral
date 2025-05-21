import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function GET() {
  try {
    const velden = await query({
      query: `
        SELECT
          veldID,
          veld AS fieldName
        FROM tblVelden
      `,
    });
    return NextResponse.json(velden);
  } catch (err) {
    console.error("/api/velden GET error:", err);
    return NextResponse.json(
      { error: "Kon velden niet ophalen." },
      { status: 500 }
    );
  }
}
