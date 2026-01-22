import { NextRequest, NextResponse } from "next/server";
import { ContentType, PrismaClient } from "@prisma/client";
import path from "path";
import { writeFile } from "fs/promises";
import { getUserId } from "@/app/utility/useUser";
import { prisma } from "../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const zip = formData.get("zip") as string;
    const statecode = formData.get("statecode") as string;
    const imageFile = formData.get("image") as File | null;
    const userId = Number(await getUserId());

    if (!title || !content || !userId || !zip || !statecode) {
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

    // Create content with image
    const newContent = await prisma.content.create({
      data: {
        description: title,
        address: "N/A",
        city: "N/A",
        statecode,
        zip,
        image: imagePath,
        status: "ACTIVE",
        discardflag: "NO",
        createdby: userId,
        type: ContentType.POST,
      },
    });

    // Create post linked to content
    const newPost = await prisma.post.create({
      data: {
        contentid: newContent.id,
      },
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.content.findMany({
      where: {
        type: "POST", // Assuming 'POST' is the type for posts
      },
      include: {
        post: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
