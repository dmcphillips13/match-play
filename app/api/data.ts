import { GolfCourse, TeeTime, User } from "@prisma/client";

// Golf course API functions
export async function getGolfCourses(): Promise<GolfCourse[]> {
  const response = await fetch("/api/golf-courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch golf courses");
  }

  return response.json();
}

export async function getGolfCourse(id: string): Promise<GolfCourse> {
  const response = await fetch(`/api/golf-courses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch golf course");
  }

  return response.json();
}

// Tee time API functions
export async function getTeeTimesByUser(userId: string): Promise<TeeTime[]> {
  const response = await fetch(`/api/tee-times?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tee times");
  }

  return response.json();
}

export async function bookTeeTime(teeTimeData: {
  userId: string;
  courseId: string;
  date: string;
  time: string;
  players: number;
}): Promise<TeeTime> {
  const response = await fetch("/api/tee-times", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teeTimeData),
  });

  if (!response.ok) {
    throw new Error("Failed to book tee time");
  }

  return response.json();
}

// Friend API functions
export interface FriendWithUserInfo {
  id: string;
  friend: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export async function getFriends(userId: string): Promise<FriendWithUserInfo[]> {
  const response = await fetch(`/api/friends?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch friends");
  }

  return response.json();
}

export async function addFriend(userId: string, friendId: string): Promise<FriendWithUserInfo> {
  const response = await fetch("/api/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, friendId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add friend");
  }

  return response.json();
}

// User API functions
export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<Omit<User, "passwordHash">> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}
