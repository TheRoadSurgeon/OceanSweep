import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ContentType } from "@prisma/client";
import path from "path";
import { writeFile } from "fs/promises";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const city = formData.get("city") as string;
    const stateCode = formData.get("stateCode") as string;
    const zip = formData.get("zip") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !date || !city || !stateCode || !zip) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    let imagePath = null;

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filename = `${Date.now()}-${imageFile.name}`;
      imagePath = `/uploads/${filename}`;

      await writeFile(path.join(uploadDir, filename), buffer);
    }

    // Create content with type EVENT
    const newContent = await prisma.content.create({
      data: {
        description,
        address: "N/A",
        city,
        statecode: stateCode,
        zip,
        image: imagePath,
        status: "ACTIVE",
        discardflag: "NO",
        type: ContentType.EVENT,
        createdby: null,
      },
    });

    // Create event linked to content
    const newEvent = await prisma.events.create({
      data: {
        contentid: newContent.id,
        scheduleddate: new Date(date),
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}