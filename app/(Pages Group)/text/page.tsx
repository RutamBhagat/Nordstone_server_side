import { Post } from "@prisma/client";
import React from "react";
import Posts from "./components/Posts";
import axios from "axios";

type Props = {
  searchParams: {
    user_id: string;
  };
};

export const revalidate = 0;

export default async function page({ searchParams: { user_id } }: Props) {
  const { data } = await axios.get<Post[]>(`${process.env.BASE_URL}/api/posts/getPosts?user_id=${user_id}`);
  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
