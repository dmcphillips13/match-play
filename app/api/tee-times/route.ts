import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Get all tee times
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");
    const date = searchParams.get("date");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: Record<string, any> = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (courseId) {
      whereClause.courseId = courseId;
    }

    if (date) {
      // Parse the date string to a Date object for the start of the day
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      // Create a date for the end of the day
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      whereClause.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const teeTimes = await prisma.teeTime.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(teeTimes);
  } catch (error) {
    console.error("Error fetching tee times:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Create a new tee time
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseId, date, time, players } = body;

    if (!userId || !courseId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert the date string to a Date object
    const teeTimeDate = new Date(date);

    const teeTime = await prisma.teeTime.create({
      data: {
        userId,
        courseId,
        date: teeTimeDate,
        time,
        players: players || 4,
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json(teeTime, { status: 201 });
  } catch (error) {
    console.error("Error creating tee time:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
