import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  try {
    const { id } = await params;

    const course = await prisma.golfCourse.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Golf course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching golf course:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const course = await prisma.golfCourse.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating golf course:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  try {
    const { id } = params;

    await prisma.golfCourse.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Golf course deleted successfully" });
  } catch (error) {
    console.error("Error deleting golf course:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
