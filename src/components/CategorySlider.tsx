"use client";
import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart,
  Carrot, 
  Milk, 
  Wheat, 
  Cookie, 
  Flame, 
  Coffee, 
  Heart, 
  Home, 
  Package, 
  Baby 
} from 'lucide-react';

const categories = [
  { name: "Fruits & Vegetables", icon: <Carrot />, color: "bg-green-100 text-green-700" },
  { name: "Dairy & Eggs", icon: <Milk />, color: "bg-stone-100 text-stone-700" },
  { name: "Rice, Atta and Grains", icon: <Wheat />, color: "bg-orange-100 text-orange-700" },
  { name: "Snacks and Biscuits", icon: <Cookie />, color: "bg-pink-100 text-pink-700" }, // Matches image
  { name: "Spices and Masalas", icon: <Flame />, color: "bg-red-100 text-red-700" },     // Matches image
  { name: "Beverages and Drinks", icon: <Coffee />, color: "bg-blue-100 text-blue-700" }, // Matches image
  { name: "Personal Care", icon: <Heart />, color: "bg-purple-100 text-purple-700" },    // Matches image
  { name: "Household Essentials", icon: <Home />, color: "bg-lime-100 text-lime-700" },  // Matches image
  { name: "Instant & Packaged Food", icon: <Package />, color: "bg-teal-100 text-teal-700" }, // Matches image
  { name: "Baby & Pet Care", icon: <Baby />, color: "bg-rose-100 text-rose-700" },
];

const CategorySlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        <ShoppingCart className="w-8 h-8 text-gray-500" /> 
        <h2 className="text-3xl font-bold text-green-800">Shop by Category</h2>
      </div>

      <div className="relative group">
        {/* Left Navigation Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white shadow-lg rounded-full p-2 text-gray-600 hover:text-green-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar in Firefox/IE
        >
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="flex-none snap-start cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <div className={`w-32 h-36 ${category.color} rounded-2xl flex flex-col items-center justify-center p-2 gap-3`}>
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center">
                  {React.cloneElement(category.icon, { size: 40, strokeWidth: 1.5 })}
                </div>
                
                {/* Text Label */}
                <span className="text-xs font-semibold text-center text-gray-700 leading-tight px-1">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white shadow-lg rounded-full p-2 text-gray-600 hover:text-green-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;