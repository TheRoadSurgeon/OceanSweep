import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ContentRequestBody {
    title: string;
    description: string;
    city: string;
    state: string;
    zipcode: string;
    date: string;
  }

export async function POST(req: Request): Promise<NextResponse> {
    console.log(req);

    const {
        title,
        description,
        city,
        state,
        zipcode,
        date,
      }: ContentRequestBody = await req.json();

    try {
        const newEvent = await prisma.testEvents.create({
            data: {
                title: title,
                description: description,
                city: city,
                state: state,
                zipcode: zipcode,
                date: date,
            },
        });

        return NextResponse.json(newEvent, { status: 201 });
    } 
    catch (error) {
        console.error("Error creating event:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const allPosts = await prisma.testEvents.findMany();

        //console.log(allPosts);

        return NextResponse.json(allPosts, { status: 201 });
    }
    catch (error) {
        console.error("Error acquiring posts:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}