import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dramas = await prisma.drama.findMany();
    console.log("Data from database:", dramas); // Debug output
    return NextResponse.json(dramas);
  } catch (error) {
    console.error("Error fetching dramas:", error);
    return NextResponse.json({ error: "Failed to fetch dramas" }, { status: 500 });
  }
}