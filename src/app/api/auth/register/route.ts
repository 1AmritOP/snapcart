import connectToDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  try {
    // take name , email , password from req.json()
    // validate name , email , password
    // connect to db
    // check email already exist or not
    // hash password
    // create user
    // return user

    const { name, email, password } = await res.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All field are required",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { message: "Email Already Exist!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      {
        message: `User Created Successfully, Name : ${user.name}, Email : ${user.email}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Failed to Register User", error);
    return NextResponse.json(
      { message: `Register Error ${error}` },
      { status: 500 }
    );
  }
}
