import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dramas = await prisma.drama.findMany();
    if (dramas.length === 0) {
      console.log("No dramas found.");
    } else {
      console.log("Data from database:", dramas); // Debug output
    }
    return NextResponse.json(dramas || []); // Return an empty array if no data
  } catch (error) {
    console.error("Error fetching dramas:", error);
    return NextResponse.json({ error: "Failed to fetch dramas" }, { status: 500 });
  }
}
