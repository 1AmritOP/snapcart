"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";


export default function ShoppingCartPage() {
  const router = useRouter();
  const {cartData: cartItems}=useSelector((state:RootState)=>state.cart)
  const dispatch= useDispatch();
  const {deliveryFee,subTotal,finalTotal}=useSelector((state: RootState)=> state.cart)



  const formatPrice = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FBF8] p-4 md:p-8 font-sans relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-8 ">
          <Link
            href="/"
            className="flex items-center text-green-700 font-semibold absolute top-6 left-6 bg-white shadow-xl px-2 py-1 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="flex flex-wrap justify-center items-center gap-3 mt-12 md:mt-0">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
            <h1 className="text-3xl font-bold text-green-700">
              Your Shopping Cart
            </h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              cartItems.map((item,idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 hover:shadow-xl rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-lg p-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-1">{item.unit}</p>
                      <p className="text-green-600 font-bold text-lg">
                        {formatPrice(Number(item.price))}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="p-2 hover:bg-white rounded-md shadow-sm transition-colors cursor-pointer text-gray-600"
                        // disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="p-2 hover:bg-white rounded-md shadow-sm transition-colors cursor-pointer text-green-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-400 hover:text-red-600 transition-colors p-2 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(subTotal)}
                    </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-green-700">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <button type="button" onClick={()=> router.push("/user/checkout")} className="w-full bg-[#00A844] hover:bg-green-700 cursor-pointer text-white font-bold py-3 rounded-full transition-colors shadow-lg shadow-green-200 mb-4">
                Proceed to Checkout
              </button>

              <div className="text-center">
                <button
                  onClick={()=> dispatch(clearCart())}
                  className="text-red-400 text-sm font-medium cursor-pointer hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}