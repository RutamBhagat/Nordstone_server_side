import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { public_id, user_id, url } = body;

  const prismaUser = await prisma.user.findUnique({
    where: { id: user_id },
  });

  if (!prismaUser) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // Upload a image url
  try {
    const result = await prisma.photo.create({
      data: {
        id: public_id,
        url: url as string,
        userId: user_id as string,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Error occured while saving image url" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, newId, newUrl } = body;

  // Update a image url
  try {
    const result = await prisma.photo.update({
      where: { id: id },
      data: { id: newId, url: newUrl },
    });
    cloudinary.uploader.destroy(id, (error: any, result: any) => {
      console.log("result", result);
      console.log("error", error);
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error occured while updating an image url" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const public_id = searchParams.get("public_id") as string;

  // Delete a image url
  try {
    await prisma.photo.delete({
      where: {
        id: public_id,
      },
    });
    cloudinary.uploader.destroy(public_id, (error, result) => {
      console.log("result", result);
      console.log("error", error);
    });

    return NextResponse.json("result", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error occured while deleting an image url" }, { status: 400 });
  }
}
