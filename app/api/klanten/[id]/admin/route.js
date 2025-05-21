import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const { admin } = await request.json();

  if (admin !== 0 && admin !== 1) {
    return NextResponse.json(
      { error: "Ongeldige waarde voor admin (moet 0 of 1 zijn)." },
      { status: 400 }
    );
  }

  try {
    await query({
      query: "UPDATE tblKlanten SET admin = ? WHERE klantID = ?",
      values: [admin, id],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`/api/klanten/${id}/admin PUT error:`, err);
    return NextResponse.json(
      { error: "Kon admin-status niet bijwerken." },
      { status: 500 }
    );
  }
}
