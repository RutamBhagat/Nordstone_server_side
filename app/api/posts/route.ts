import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, user_id } = body;

  // Get user
  const prismaUser = await prisma.user.findUnique({
    where: { id: user_id },
  });

  // Check user
  if (!prismaUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // Check title
  if (title.length > 300) {
    return NextResponse.json({ message: "Please Write a shorter post" }, { status: 400 });
  } else if (!title.length) {
    return NextResponse.json({ message: "Please do not leave this empty" }, { status: 400 });
  }

  // Create a post
  try {
    const result = await prisma.post.create({
      data: {
        title: title as string,
        userId: user_id as string,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while creating a post" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const text_id = searchParams.get("text_id") as string;

  // Delete a post
  try {
    const result = await prisma.post.delete({
      where: {
        id: text_id,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Post not found" }, { status: 400 });
  }
}
