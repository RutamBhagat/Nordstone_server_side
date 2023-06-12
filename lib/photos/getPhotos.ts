import { type Photo } from "@prisma/client";
import { prisma } from "../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function getPhotos() {
  const session = await getServerSession(authOptions);

  try {
    const data: Photo[] = await prisma.photo.findMany({
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
