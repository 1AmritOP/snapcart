"use client";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

type propType={
    nextstep:(s:number)=>void
}
const Welcome = ({nextstep}: propType) => {
  return (
    <div className=" min-h-screen w-full flex justify-center items-center ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text flex items-center text-center flex-col gap-4 w-1/2"
      >
        <h1 className=" flex items-center gap-2 text-4xl font-bold text-green-700">
          {" "}
          <ShoppingBasket /> SnapCart{" "}
        </h1>
        <p>
          Your one-stop destination for fresh groceries. Shop for your daily
          needs and enjoy a hassle-free shopping experience.
        </p>
        <div className="icon flex gap-2">
          <ShoppingBasket className=" w-24 h-24 md:w-32 md:h-32 text-green-700" />
          <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-600" />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={()=>nextstep(2)}
          className="flex gap-2 bg-green-600 hover:bg-green-700 duration-200 cursor-pointer py-2 px-4 rounded-xl text-white"
        >
          <h1>Next</h1>
          <ArrowRight />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
