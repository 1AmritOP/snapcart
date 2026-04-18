"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ArrowLeft, Loader, Plus, Upload } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const AddGroceryForm = () => {
  const units = ["kg", "g", "liter", "ml", "piece", "pack"];
  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice, Atta and Grains",
    "Snacks and Biscuits",
    "Spices and Masalas",
    "Beverages and Drinks",
    "Personal Care",
    "Household Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care",
  ];

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [backendImage, setBackendImage] = useState<Blob | null>();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setBackendImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("unit", unit);
    formData.append("category", category);
    if (backendImage) {
      formData.append("image", backendImage);
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/add-grocery", formData);
      console.log(res.data);
      setLoading(false);
      setName("");
      setCategory("");
      setUnit("");
      setPrice("");
      setBackendImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.log("Error : ", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative p-4 md:p-6 flex flex-col md:flex-row items-center justify-center font-sans">
      <Link href="/" className="self-start mb-4 md:absolute md:top-6 md:left-6 md:mb-0 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-green-700 font-medium hover:bg-gray-50 transition-colors border border-gray-100 text-sm md:text-base">
        <ArrowLeft size={18} />
        <span>Back to home</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="border-2 border-green-600 rounded-full p-0.5">
              <Plus size={20} className="text-green-600" />
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Add Your Grocery
            </h1>
          </div>
          <p className="text-gray-400 text-xs md:text-sm">
            Fill out the details below to add a new grocery item.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* Grocery Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Grocery Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
              name="name"
              placeholder="eg: sweets, Milk ..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-gray-700 text-sm md:text-base"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <select
                required
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white text-gray-700 text-sm md:text-base"
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="eg. 120"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />
          </div>

          {/* Upload Image Button */}
          <div className=" flex flex-col sm:flex-row gap-5 items-center">
            <label
              htmlFor="image"
              className="flex items-center justify-center gap-2 w-full sm:w-fit px-6 py-2.5 bg-green-50 rounded-lg text-green-700 font-medium hover:bg-green-100 transition-colors border border-green-100 text-sm md:text-base"
            >
              <Upload size={18} />
              <span>Upload image</span>
            </label>
            <input
              type="file"
              required
              onChange={handleImageChange}
              id="image"
              accept="image/*"
              className="hidden"
            />

            {previewImage && (
              <Image
                className="rounded-xl shadow-md border border-gray-200 object-cover"
                src={previewImage}
                alt="ProductImg"
                height={100}
                width={100}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mt-4 text-sm md:text-base"
          >
            {loading? <Loader className=" w-5 h-5 animate-spin" /> : "Add Grocery"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroceryForm;
