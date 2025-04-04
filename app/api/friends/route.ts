import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Define a simpler type for friend data from Prisma
interface FriendshipData {
  id: string;
  userId: string;
  friendId: string;
  createdAt: Date;
  friend: {
    id: string;
    name: string;
    email: string;
  };
}

// Get friends for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get friends (users who the current user has marked as friends)
    const friends = await prisma.friend.findMany({
      where: { userId },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Transform to more user-friendly format
    const formattedFriends = friends.map((friendship: FriendshipData) => ({
      id: friendship.id,
      friend: friendship.friend,
      createdAt: friendship.createdAt,
    }));

    return NextResponse.json(formattedFriends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Add a friend
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, friendId } = body;

    if (!userId || !friendId) {
      return NextResponse.json(
        { error: "User ID and friend ID are required" },
        { status: 400 }
      );
    }

    // Check if the users exist
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    const friendExists = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!userExists || !friendExists) {
      return NextResponse.json(
        { error: "User or friend does not exist" },
        { status: 404 }
      );
    }

    // Check if friendship already exists
    const existingFriendship = await prisma.friend.findFirst({
      where: {
        userId,
        friendId,
      },
    });

    if (existingFriendship) {
      return NextResponse.json(
        { error: "Friendship already exists" },
        { status: 400 }
      );
    }

    // Create friendship
    const friendship = await prisma.friend.create({
      data: {
        userId,
        friendId,
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(friendship, { status: 201 });
  } catch (error) {
    console.error("Error adding friend:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Remove a friend
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const friendshipId = searchParams.get("id");

    if (!friendshipId) {
      return NextResponse.json(
        { error: "Friendship ID is required" },
        { status: 400 }
      );
    }

    // Check if friendship exists
    const friendship = await prisma.friend.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friendship not found" },
        { status: 404 }
      );
    }

    // Delete friendship
    await prisma.friend.delete({
      where: { id: friendshipId },
    });

    return NextResponse.json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
