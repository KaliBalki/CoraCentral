import { NextResponse } from "next/server";
import { query } from "@/app/_db/db";

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await query({
      query: "DELETE FROM tblVelden WHERE veldID = ?",
      values: [id],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`/api/velden/${id} DELETE error:`, err);
    return NextResponse.json(
      { error: "Kon veld niet verwijderen." },
      { status: 500 }
    );
  }