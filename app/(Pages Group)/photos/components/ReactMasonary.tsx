"use client";
import { type Photo } from "@prisma/client";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PhotoComponent from "./PhotoComponent";

type Props = { data: Photo[] };

export default function ReactMasonaryComponent({ data }: Props) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
      <Masonry gutter="12px">
        {data?.map((photo) => (
          <PhotoComponent key={photo.id} photo={photo} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
