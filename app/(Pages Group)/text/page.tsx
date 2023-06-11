import { Post } from "@prisma/client";
import React from "react";
import Posts from "./components/Posts";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 0;

export default async function page() {
  const session = await getServerSession(authOptions);
  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  };
  const { data } = await axios.get<Post[]>(
    `${process.env.BASE_URL}/api/posts/getPosts?user_id=${session?.user.id}`,
    config
  );
  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
