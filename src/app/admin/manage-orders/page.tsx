"use client";
import AdminOrderCard from "@/components/AdminOrderCard";
import { IOrder } from "@/models/order.modal";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router= useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    async function getOrders() {
      try {
        const res = await axios.get("/api/admin/get-orders");
        setOrders(res.data);
      } catch (error) {
        console.log("Get Orders Error : ", error);
      }
    }
    getOrders();
  }, []);
  return (
    <div className=" min-h-screen bg-gray-50 w-full relative">
      <div className="fixed top-0 left-0 bg-white/70 w-full  backdrop-blur-lg shadow-sm border-b z-50">
        <div className=" flex items-center mx-auto max-w-3xl gap-4 px-4 py-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className=" p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft size={24} className=" text-green-600" /> {}
          </button>
          <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
        </div>
      </div>
      <div className=" pt-24 pb-16 max-w-6xl mx-auto space-y-8">
        <div className=" space-y-6">
          {orders.map((order,idx) => (
            <AdminOrderCard key={idx} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
