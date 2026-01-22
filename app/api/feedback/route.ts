import { prisma } from "../../lib/prisma";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserId } from "@/app/utility/useUser";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { subject, description } = await req.json();

    if (!subject || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = Number(await getUserId());
    console.log("userId ", userId)
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }
      

    // Save feedback to the database
    const feedback = await prisma.feedback.create({
      data: {
        subject,
        description,
        status: $Enums.userstatus.ACTIVE,
        discardflag: $Enums.discardflag.NO,
        createdby: userId,
        createddate: new Date(),
      },
    });

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
