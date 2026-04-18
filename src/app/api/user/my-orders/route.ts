import { auth } from "@/auth";
import connectToDB from "@/lib/db";
import Order from "@/models/order.modal";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connectDb
    // get session 
    // get user all product 
    // send res
    await connectToDB();
    const session = await auth();

    const orders= await Order.find({user: session?.user?.id}).populate("user")

    if (!orders) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `get my orders error : ${error}` }, { status: 500 });
  }
}
