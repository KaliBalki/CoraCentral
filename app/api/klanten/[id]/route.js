import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const results = await query({
      query:
        "SELECT klantID, voornaam, naam, telefoonnummer, email, admin FROM tblKlanten WHERE klantID = ?",
      values: [id],
    });
    if (!results.length) {
      return NextResponse.json(
        { error: "Klant niet gevonden." },
        { status: 404 }
      );
    }
    return NextResponse.json(results[0]);
  } catch (err) {
    console.error(`/api/klanten/${id} GET error:`, err);
    return NextResponse.json(
      { error: "Kon klant niet ophalen." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await query({
      query: "DELETE FROM tblKlanten WHERE klantID = ?",
      values: [id],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`/api/klanten/${id} DELETE error:`, err);
    return NextResponse.json(
      { error: "Kon klant niet verwijderen." },
      { status: 500 }
    );
  }
}
