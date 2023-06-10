import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  try {
    const data = await prisma.photo.findMany({
      where: {
        userId: user_id as string,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: "User not found" }, { status: 500 });
  }
}