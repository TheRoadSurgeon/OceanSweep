import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    
    const session = await auth();
    const userId = session && session.user ? Number(session.user.id) : undefined;
    console.log(userId);

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        zip: true,
        username: true,
        userrole: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}