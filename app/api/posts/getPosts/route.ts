import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let accessToken = request.headers.get("Authorization") as string;
  accessToken = accessToken?.replace("Bearer ", "");

  let user = null;
  if (!accessToken) {
    user = verifyJwt(accessToken);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const data = await prisma.post.findMany({
      where: {
        userId: user?.id,
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
    return NextResponse.json({ err: "User not found" }, { status: 403 });
  }
}
