import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { Post } from "@prisma/client";
import { prisma } from "../prisma";

export default async function getTexts() {
  const session = await getServerSession(authOptions);

  try {
    const data: Post[] = await prisma.post.findMany({
      where: {
        userId: session?.user?.id as string,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
