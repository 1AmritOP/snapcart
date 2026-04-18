"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bike, User, UserCog } from "lucide-react";
import axios from "axios";
import {  useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditRoleMobile = () => {
  const [roles, setRoles] = useState([
    {
      id: "user",
      label: "User",
      icon: User,
    },
    {
      id: "deliveryBoy",
      label: "Delivery Boy",
      icon: Bike,
    },
    {
      id: "admin",
      label: "Admin",
      icon: UserCog,
    },
  ]);
  const [selectedRole, setSelectedRole] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const {update}=useSession();
  const handleEdit = async () => {
    try {
      const res = await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile,
      });
      console.log(res.data);
      await update({role:selectedRole});
      router.push("/");
    } catch (error) {
      console.log("Handle Edit Role Error", error);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen p-6 w-full bg-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl md:text-4xl font-extrabold mt-8 text-green-700"
      >
        Select Your Role
      </motion.h1>
      <div className=" flex flex-col justify-center items-center md:flex-row mt-10 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole == role.id;
          return (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedRole(role.id);
              }}
              className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 transition-all ${isSelected ? "border-green-600 bg-green-100 shadow-lg" : "bg-white border-gray-300 hover:border-green-400"} cursor-pointer`}
            >
              <Icon />
              <span> {role.label} </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className=" flex flex-col items-center justify-center mt-10"
      >
        <label htmlFor="mobile" className=" text-gray-700 font-medium mb-2">
          {" "}
          Enter Your Mobile Number{" "}
        </label>
        <input
          type="tel"
          id="mobile"
          placeholder="eg. 9876543210"
          className=" w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800 "
          onChange={(e) => setMobile(e.target.value)}
        />
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        onClick={() => handleEdit()}
        disabled={!selectedRole || mobile.length !== 10}
        className={` inline-flex items-center justify-center gap-2 w-52 py-3 px-8 rounded-2xl shadow-md mt-7 
            ${selectedRole && mobile.length === 10 ? "hover:bg-green-700 bg-green-500 text-white cursor-pointer " : "cursor-not-allowed bg-gray-300 text-gray-500"}
        `}
      >
        {" "}
        Go To Home <ArrowRight />{" "}
      </motion.button>
    </div>
  );
};

export default EditRoleMobile;
