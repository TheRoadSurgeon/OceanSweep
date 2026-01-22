import { NextResponse } from 'next/server';
import { prisma } from "../../lib/prisma";

export async function GET() {
    try {
      const events = await prisma.content.findMany({
        where: {
          type: 'EVENT', // Assuming 'EVENT' is the type for events
        },
        include: {
          events: true,
        },
      });
      return NextResponse.json(events);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }
  }
  