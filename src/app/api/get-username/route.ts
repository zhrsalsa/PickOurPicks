import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { name: true },
    });

    return NextResponse.json({ username: user?.name });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch username" }, { status: 500 });
  }
}