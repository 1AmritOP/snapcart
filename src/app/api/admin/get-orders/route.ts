import connectToDB from "@/lib/db";
import Order from "@/models/order.modal";
import { NextResponse } from "next/server";

export async function GET() {
    // connect to db
    // get all orders
    // send res
    try {
        await connectToDB();
        const orders= await Order.find({}).populate("user");
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `get orders error : ${error}` }, { status: 500 });
    }
}