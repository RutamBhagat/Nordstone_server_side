"use client";
import React, { useState, useTransition } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      await axios.post("/api/posts", { title: title, user_id: session?.user?.id });
      setTitle("");
    } catch (error) {
      console.log("error", error);
    }
    setIsDisabled(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={submitPost}>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 border">
        <textarea
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          rows={1}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none"
          placeholder="Your message..."
        ></textarea>
        <div className="flex pl-0 space-x-1 sm:pl-2">
          <p
            className={`font-bold text-sm mr-2 ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
          >{`${title.length}/300`}</p>
        </div>
        <button
          disabled={isDisabled}
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
