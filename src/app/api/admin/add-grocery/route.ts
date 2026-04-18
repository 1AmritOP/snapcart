import { auth } from "@/auth";
import uploadToCloudinary from "@/lib/cloudinary";
import connectToDB from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //connect to db
  // check admin or not
  // take name , image , price , category from formData
  // validate name , image , price , category
  // upload image on cloudinary
  // create grocery
  // return grocery
  try {
    await connectToDB();
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 400 },
      );
    }
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;

    const image = formData.get("image") as Blob | null;
    if (!name || !image || !price || !category || !unit) {
      return NextResponse.json(
        { message: "All field are required" },
        { status: 400 },
      );
    }
    let imageUrl;
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }
    const newGrocery = await Grocery.create({
      name,
      image: imageUrl,
      price,
      category,
      unit,
    });
    return NextResponse.json({grocery:newGrocery}, { status: 201 });
  } catch (error) {
    console.log("add grocery error : ",error);
    return NextResponse.json(
      { message: `add grocery error : ${error}` },
      { status: 500 },
    );
  }
}
