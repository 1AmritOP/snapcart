"use client";
import { ArrowRight, CircleCheckBig, Package } from "lucide-react";
import React from "react";
import { easeInOut, motion, spring } from "motion/react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className=" flex flex-col items-center justify-center min-h-screen px-6 text-center bg-linear-to-b from-green-50 to-white">
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{
            type: spring,
            damping: 10,
            stiffness: 100,
          }}
          className=" relative "
        >
          <CircleCheckBig className=" text-green-600 h-24 w-24 md:h-28 md:w-28" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className=" font-bold md:text-4xl text-3xl text-green-700 mt-6"
        >
          Order Placed Successfully
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className=" text-gray-600 text-sm md:text-base mt-3 max-w-md"
        >
          Thank you for shopping with us! Your order has been placed and being
          processed. you can track its progress in your{" "}
          <span className=" text-green-600">My Order</span> Section.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y:40 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, ease: easeInOut, repeatType: "reverse"  }}
          className="mt-6"
        >
            <Package className=" text-green-600 h-16 w-16 md:h-20 md:w-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-6"
        >
          <Link href={"/user/my-orders"}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              className=" flex items-center gap-2 justify-center px-8 py-3 rounded-full bg-green-600 text-white shadow-lg font-semibold text-base"
            >
              Go to My Orders <ArrowRight />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default page;
