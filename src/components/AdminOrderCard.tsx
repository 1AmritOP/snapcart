"use client";
import { IOrder } from "@/models/order.modal";
import React from "react";
import { motion } from "motion/react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";

const AdminOrderCard = ({ order }: { order: IOrder }) => {
  const [expanded, setExpanded] = React.useState(false);
  const statusOptions= ["pending", "out for delivery"];
  return (
    <motion.div
      key={order._id?.toString()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" shadow-md hover:shadow-lg bg-white border border-gray-100 rounded-2xl p-6 transition-all"
    >
      <div className=" flex flex-col md:flex-row md:justify-between md:items-start gap-4 ">
        <div className=" space-y-1">
          <p className=" text-lg font-bold flex items-center gap-2 text-green-600">
            <Package size={20} />
            Order #{order._id?.toString().slice(-8)}
          </p>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${order.isPaid ? "text-green-600 bg-green-100 border-green-300" : "text-red-600 bg-red-100 border-red-300"}`}
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>
          <p className=" mt-1 text-xs text-gray-500">
            {" "}
            {new Date(order?.createdAt!).toLocaleString()}{" "}
          </p>
          <div className=" mt-3 space-y-1 text-gray-700 text-sm">
            <p className=" flex items-center gap-2 font-semibold">
              <User size={16} className=" text-green-600" />
              <span>{order?.address.fullName}</span>
            </p>
            <p className=" flex items-center gap-2 font-semibold">
              <Phone size={16} className=" text-green-600" />
              <span>{order?.address.mobile}</span>
            </p>
            <p className=" flex items-center gap-2 font-semibold">
              <MapPin size={16} className=" text-green-600" />
              <span>{order?.address.fullAddress}</span>
            </p>
            <p className=" flex items-center gap-2 font-semibold">
              <CreditCard size={16} className=" text-green-600" />
              <span>
                {order?.paymentMethod == "cod"
                  ? "Cash on Delivery"
                  : " Online Payment"}
              </span>
            </p>
          </div>
        </div>
        <div className=" flex flex-col items-start md:items-end gap-2">
          <span
            className={` text-sm font-semibold px-3 py-1 rounded-full border capitalize 
            ${order.status == "pending" ? "text-yellow-600 bg-yellow-100" : order.status == "delivered" ? "text-green-600 bg-green-100 " : "text-blue-600 bg-blue-100"}`}
          >
            {" "}
            {order.status}{" "}
          </span>
          <select className=" border border-gray-300 px-3 py-1 rounded-lg text-sm shadow-sm hover:border-green-400 transition focus:ring-2 focus:ring-green-400 outline-none" name="status" id="status">
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" border-t border-gray-300 pt-3 pb-3">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className=" w-full flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-green-700 transition"
        >
          <span className=" flex items-center gap-2">
            <Package size={16} className=" text-green-600" />
            {expanded ? "Hide Your Items" : ` view ${order.items.length} items`}
          </span>

          {expanded ? (
            <ChevronUp size={16} className="text-green-600" />
          ) : (
            <ChevronDown size={16} className=" text-green-600" />
          )}
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className=" overflow-hidden"
        >
          <div className=" mt-3 space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className=" flex items-center justify-between gap-4 hover:bg-gray-200 rounded-xl px-3 py-2"
              >
                <div className=" flex items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className=" object-contain"
                  />
                  <div>
                    <h3 className=" text-sm font-semibold text-gray-700">
                      {item.name}
                    </h3>
                    <p className=" text-xs text-gray-500">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                </div>
                <p className=" text-sm font-semibold text-gray-700">
                  ₹{Number(item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className=" border-t pt-3 flex items-center justify-between text-sm font-semibold text-gray-800">
        <div className=" flex items-center gap-2 text-gray-700 text-sm">
          <Truck size={16} className=" text-green-600" />
          <span>
            {" "}
            Delivery :{" "}
            <span className=" text-green-600 font-semibold">
              {order.status}
            </span>{" "}
          </span>
        </div>
        <div className=" flex items-center gap-2 text-gray-700 text-sm">
          Total :<span className=" text-green-600">₹{order.totalAmount}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOrderCard;
