"use client";
import React, { useRef, useEffect, useTransition } from "react";
import axios from "axios";
import CreateButton from "./CreateButton";
import UpdateButton from "./UpdateButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  command: string;
  photoId?: string;
  setIsFetching?: (value: boolean) => void;
};

export default function UploadWidget({ command, photoId, setIsFetching }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  const handleUpload = async ({ public_id, secure_url }: { public_id: string; secure_url: string }) => {
    if (setIsFetching) {
      setIsFetching(true);
    }
    try {
      await axios.post("/api/photos/upload", {
        public_id: public_id,
        user_id: session?.user?.id,
        url: secure_url,
      });
    } catch (error) {
      console.log("error", error);
    }
    if (setIsFetching) {
      setIsFetching(false);
    }
    startTransition(() => {
      router.refresh();
    });
  };

  const handleUpdate = async ({ id, newId, secure_url }: { id: string; newId: string; secure_url: string }) => {
    if (setIsFetching) {
      setIsFetching(true);
    }
    try {
      await axios.post("/api/photos/update", {
        id: id,
        newId: newId,
        newUrl: secure_url,
      });
    } catch (error) {
      console.log("error", error);
    }
    if (setIsFetching) {
      setIsFetching(false);
    }
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    // @ts-ignore
    cloudinaryRef.current = window?.cloudinary;
    // @ts-ignore
    widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
      { cloudName: "drxe0t2yg", uploadPreset: "my_uploads" },
      (error: any, result: any) => {
        if (result.event === "success") {
          if (command === "CREATE") {
            handleUpload({
              public_id: result.info.public_id,
              secure_url: result.info.secure_url,
            });
          } else if (command === "UPDATE") {
            if (photoId) {
              handleUpdate({
                id: photoId,
                newId: `${result.info.public_id}`,
                secure_url: `${result.info.secure_url}`,
              });
            }
          }
        }
      }
    );
  }, []);

  return command === "CREATE" ? (
    <CreateButton
      clickHandler={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
    />
  ) : (
    <UpdateButton
      clickHandler={() => {
        // @ts-ignore
        widgetRef.current.open();
      }}
    />
  );
}
