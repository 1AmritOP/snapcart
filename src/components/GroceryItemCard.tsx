"use client";
import { IGrocery } from "@/models/grocery.model";
import React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, decreaseQuantity, increaseQuantity } from "@/redux/cartSlice";

const GroceryItemCard = ({ item }: { item: IGrocery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector((state: RootState) => state.cart);
  const cartItem = cartData?.find((i) => i._id == item._id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="group w-full max-w-xs bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
    >
      {/* Image Container */}
      <div className="relative w-full h-40 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 " />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">
          {item.category}
        </span>
        <h3
          className="text-base font-bold text-gray-800 line-clamp-1"
          title={item.name}
        >
          {item.name}
        </h3>
      </div>

      {/* Price & Unit Row */}
      <div className="flex items-center justify-between mt-auto">
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
          {item.unit}
        </div>
        <span className="text-lg font-bold text-green-700">₹{item.price}</span>
      </div>

      {/* Add to Cart Button */}
      {cartItem ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" flex items-center justify-center gap-4 bg-green-50 border border-green-200 rounded-full py-2 px-4"
        >
          <button
            onClick={() => dispatch(increaseQuantity(item._id!))}
            type="button"
            className=" w-7 h-7 rounded-full flex items-center justify-center bg-green-100 hover:bg-green-200 transition-all cursor-pointer"
          >
            <Plus size={16} className="text-green-700" />
          </button>
          <p className=" text-sm font-semibold text-gray-800">
            {cartItem.quantity}
          </p>
          <button
            onClick={()=>dispatch(decreaseQuantity(item._id))}
            type="button"
            className=" w-7 h-7 rounded-full flex items-center justify-center bg-green-100 hover:bg-green-200 transition-all cursor-pointer"
          >
            <Minus size={16} className="text-green-700" />
          </button>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          whileTap={{ scale: 0.96 }}
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>
      )}
    </motion.div>
  );
};

export default GroceryItemCard;
