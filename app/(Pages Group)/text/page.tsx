import { Post } from "@prisma/client";
import React from "react";
import Posts from "./components/Posts";
import axios from "axios";

type Props = {
  searchParams: {
    user_id: string;
    token: string;
  };
};

export const revalidate = 0;

export default async function page({ searchParams: { user_id, token } }: Props) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<Post[]>(`${process.env.BASE_URL}/api/posts/getPosts?user_id=${user_id}`, config);
  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
