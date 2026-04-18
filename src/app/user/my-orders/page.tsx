"use client"
import { IOrder } from "@/models/order.modal";
import axios from "axios";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { div } from "motion/react-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {motion} from "motion/react";
import UserOrderCard from "@/components/UserOrderCard";

const page = () => {
  const router= useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const result= await axios.get("/api/user/my-orders")
        setOrders(result.data);
        setLoading(false);
      } catch (error) {
        console.log("Error during Fetching My-Orders",error)
      }
    };

    getMyOrders();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-[50vh]">
          Loading Your Orders...
        </div>
      </>
    )
  }

  return (
    <>
      <div className=" w-full h-screen bg-linear-to-b from-white to-gray-100">
        <div className=" max-w-3xl pb-10 pt-16 relative mx-auto px-4 ">
          <div className="fixed top-0 left-0 bg-white/70 w-full  backdrop-blur-lg shadow-sm border-b z-50">
            <div className=" flex items-center mx-auto max-w-3xl gap-4 px-4 py-3">
              <button
                type="button"
                onClick={()=> router.push("/")}
                className=" p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
              >
                <ArrowLeft size={24} className=" text-green-600" /> {}
              </button>
              <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
            </div>
          </div>

          {
            orders.length == 0 ? (
              <div className=" flex flex-col items-center justify-center pt-20">
                <PackageSearch size={70} className=" text-green-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">No Orders Found</h2>
                <p className="text-sm mt-1 text-gray-500">Start shopping to see your orders</p>
              </div>
            ):(
              <div className=" mt-4 space-y-6">
                {
                  orders.map((order,idx)=>(
                    <motion.div
                    initial={{y:20, opacity: 0}}
                    animate={{y:0, opacity: 1}}
                    transition={{duration: 0.3, delay: idx * 0.1}}
                    key={idx}
                    >
                      <UserOrderCard order={order} />
                    </motion.div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default page;
