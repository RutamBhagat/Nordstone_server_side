import { type Post } from "@prisma/client";
import React from "react";
import Posts from "./components/Posts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const getTexts = async (user_id: string) => {
  try {
    const data: Post[] = await prisma.post.findMany({
      where: {
        userId: user_id,
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
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const data = await getTexts(session?.user?.id as string);
  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
