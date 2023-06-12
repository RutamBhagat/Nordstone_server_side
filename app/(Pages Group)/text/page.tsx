import React from "react";
import Posts from "./components/Posts";
import getTexts from "@/lib/posts/getTexts";

export const revalidate = 0;

export default async function page() {
  const data = await getTexts();
  return (
    <>
      {data?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
}
