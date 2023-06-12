import { type Photo } from "@prisma/client";
import ReactMasonaryComponent from "./components/ReactMasonary";
import CreatePhoto from "./components/CreatePhoto";
import getPhotos from "@/lib/photos/getPhotos";

export const revalidate = 0;

export default async function page() {
  const data = await getPhotos();
  return (
    <>
      <div className="flex-1 p-3">
        <ReactMasonaryComponent data={data as Photo[]} />
      </div>
      <CreatePhoto />
    </>
  );
}
