import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();

  try {
    // Cek apakah username sudah digunakan oleh user lain
    const existingUser = await db.user.findUnique({
      where: { name: username },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    // Update username di database
    await db.user.update({
      where: { email: session.user.email },
      data: { name: username },
    });

    return NextResponse.json({ message: "Username updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update username" }, { status: 500 });
  }
}