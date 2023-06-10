import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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
