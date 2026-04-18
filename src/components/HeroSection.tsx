"use client";

import { Leaf, ShoppingBasket, Smartphone, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import img1 from "../assets/delivery.jpg";
import img2 from "../assets/groceries.jpg";
import img3 from "../assets/shopping.jpg";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      icons: (
        <Leaf className="h-20 w-20 sm:h-28 sm:w-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Fresh Organic Groceries",
      subtitle:
        "Farm-fresh fruits,vegetables, and daily essentials delivered to you",
      btnText: "Shop Now",
      bg: img1,
    },
    {
      id: 2,
      icons: (
        <Truck className="h-20 w-20 sm:h-28 sm:w-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Fast and Reliable Delivery",
      subtitle: "We ensure your groceries reach your doorstep in no time",
      btnText: "Order Now",
      bg: img2,
    },
    {
      id: 3,
      icons: (
        <Smartphone className="h-20 w-20 sm:h-28 sm:w-28 text-green-400 drop-shadow-lg" />
      ),
      title: "Shop anythime, anywhere",
      subtitle: "Easy and seemless online grocery shopping experience",
      btnText: "Get Started",
      bg: img3,
    },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <div className=" w-[95%] mx-auto h-[80vh] overflow-hidden mt-2 relative py-10 rounded-3xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute -z-10 inset-0"
          >
            <Image
              src={slides[current].bg}
              fill
              className="object-cover"
              alt="Img"
              priority
            />
            <div className="absolute bg-black/50 inset-0 backdrop-blur-[1px]" />
          </motion.div>
        </AnimatePresence>

        <div className=" absolute inset-0  flex items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" flex flex-col items-center justify-center gap-6 max-w-3xl"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-full shadow-lg">
              {slides[current].icons}
            </div>
            <h1 className=" text-3xl md:text-6xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              {slides[current].title}
            </h1>
            <p className=" text-sm md:text-lg text-gray-200 max-w-2xl">{slides[current].subtitle}</p>
            <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{duration:0.2}}
             className="mt-4  bg-white text-green-700 cursor-pointer hover:bg-green-100 duration-300 py-3 px-8 font-semibold shadow-lg transition-all rounded-full flex items-center gap-2">
                <ShoppingBasket className=" w-5 h-5" />
              {slides[current].btnText}
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
