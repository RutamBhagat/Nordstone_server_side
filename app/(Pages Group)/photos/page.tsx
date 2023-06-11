import { type Photo } from "@prisma/client";
import axios from "axios";
import ReactMasonaryComponent from "./components/ReactMasonary";
import CreatePhoto from "./components/CreatePhoto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 0;

export default async function page() {
  const session = await getServerSession(authOptions);
  const config = {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  };
  const { data } = await axios.get<Photo[]>(
    `${process.env.BASE_URL}/api/photos/getPhotos?user_id=${session?.user.id}`,
    config
  );
  return (
    <>
      <div className="flex-1 p-3">
        <ReactMasonaryComponent data={data} />
      </div>
      <CreatePhoto />
    </>
  );
}
