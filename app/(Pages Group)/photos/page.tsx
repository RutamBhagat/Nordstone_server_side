import { type Photo } from "@prisma/client";
import axios from "axios";
import ReactMasonaryComponent from "./components/ReactMasonary";

type Props = {
  searchParams: {
    user_id: string;
  };
};

export const revalidate = 0;

export default async function page({ searchParams: { user_id } }: Props) {
  const { data } = await axios.get<Photo[]>(`${process.env.BASE_URL}/api/photos/getPhotos?user_id=${user_id}`);
  return (
    <>
      <div className="flex-1 p-3">
        <ReactMasonaryComponent data={data} />
      </div>
      {/* <CreatePhoto />s */}
    </>
  );
}
