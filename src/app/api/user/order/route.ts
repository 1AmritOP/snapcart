import connectToDB from "@/lib/db";
import Order from "@/models/order.modal";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // connect to db
    // take userId,items,paymentMethod, totalAmount, address from req.json()
    // validate userId,items,paymentMethod, totalAmount, address
    // find user by userId
    // check paymentMethod is cod or not
    // create order
    await connectToDB();
    const { userId, items, paymentMethod, totalAmount, address } =
      await req.json();
    if (!userId || !items || !paymentMethod || !totalAmount || !address) {
      return NextResponse.json(
        { message: "please provide all details" },
        { status: 400 },
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const newOrder = await Order.create({
      user: userId,
      items,
      paymentMethod,
      totalAmount,
      address,
    });
    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Place order error : ${error}` },
      { status: 500 },
    );
  }
}
