import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Get all golf courses
export async function GET() {
  try {
    const courses = await prisma.golfCourse.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching golf courses:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Create a new golf course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, imageUrl, address, city, state, zipCode, phone, website, par, holes } = body;

    if (!name || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const course = await prisma.golfCourse.create({
      data: {
        name,
        description,
        imageUrl,
        address,
        city,
        state,
        zipCode,
        phone,
        website,
        par,
        holes: holes || 18,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating golf course:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
