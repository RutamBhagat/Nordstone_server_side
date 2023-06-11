import { type Photo } from "@prisma/client";
import axios from "axios";
import ReactMasonaryComponent from "./components/ReactMasonary";
import CreatePhoto from "./components/CreatePhoto";

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
  const { data } = await axios.get<Photo[]>(`${process.env.BASE_URL}/api/photos/getPhotos?user_id=${user_id}`, config);
  return (
    <>
      <div className="flex-1 p-3">
        <ReactMasonaryComponent data={data} />
      </div>
      <CreatePhoto />
    </>
  );
}
