import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoy from "@/components/DeliveryBoy";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import connectToDB from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";
import React from "react";

async function Home() {
  const session = await auth();
  await connectToDB();
  const user = await User.findOne({ email: session?.user?.email });
  if (!user) {
    redirect("/login");
  }
  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");
  if (inComplete) {
    return <EditRoleMobile />;
  }
  const plainUser = JSON.parse(JSON.stringify(user));
  return (
    <>
      <Nav user={plainUser} />
      <div>
        {user.role == "user" ? (
          <UserDashboard />
        ) : user.role == "admin" ? (
          <AdminDashboard />
        ) : (
          <DeliveryBoy />
        )}
      </div>
    </>
  );
}

export default Home;
