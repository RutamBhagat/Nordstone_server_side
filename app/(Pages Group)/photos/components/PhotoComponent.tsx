"use client";

import React, { useState, useTransition } from "react";
import axios from "axios";
import { type Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import UploadWidget from "./UploadWidget";

type Props = {
  photo: Photo;
};

export default function PhotoComponent({ photo }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const toggleFullscreen = () => setFullscreen(!fullscreen);

  const isMutating = isFetching || isPending;

  const handleDelete = async () => {
    setIsFetching(true);
    try {
      await axios.delete(`/api/photos/delete?public_id=${photo.id}`);
    } catch (error) {
      console.log("error", error);
    }
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <img
        onClick={toggleFullscreen}
        src={photo.url}
        className={`w-full h-full cursor-pointer object-cover object-center ${isMutating ? "animate-pulse" : ""}`}
      />
      {fullscreen && (
        <div onClick={toggleFullscreen} className="fixed z-50 inset-0 bg-black bg-opacity-75">
          <div className="w-full h-full flex justify-center items-center cursor-pointer">
            <div className="relative">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                }}
                src={photo.url}
                className={`relative max-w-[75vw] max-h-[90vh] cursor-default ${isMutating ? "animate-pulse" : ""}`}
              />
              <form
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-5 right-5 flex flex-col gap-3"
              >
                <button
                  onClick={handleDelete}
                  type="button"
                  className="p-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
                >
                  <img
                    className="w-8 h-8"
                    src="https://img.icons8.com/nolan/64/delete-forever.png"
                    alt="delete-forever"
                  />
                </button>
                <UploadWidget
                  setIsFetching={(value: boolean) => {
                    setIsFetching(value);
                  }}
                  photoId={photo.id}
                  command={"UPDATE"}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
