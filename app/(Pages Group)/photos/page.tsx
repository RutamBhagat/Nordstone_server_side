import { type Photo } from "@prisma/client";
import ReactMasonaryComponent from "./components/ReactMasonary";
import CreatePhoto from "./components/CreatePhoto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const getPhotos = async (user_id: string) => {
  try {
    const data: Photo[] = await prisma.photo.findMany({
      where: {
        userId: user_id,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const data = await getPhotos(session?.user?.id as string);
  return (
    <>
      <div className="flex-1 p-3">
        <ReactMasonaryComponent data={data as Photo[]} />
      </div>
      <CreatePhoto />
    </>
  );
}
