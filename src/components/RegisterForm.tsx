"use client";
import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import googleLogo from "@/assets/googleLogo.png"
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type propType = {
  previousStep: (s: number) => void;
};
const RegisterForm = ({ previousStep }: propType) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const router= useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res= await axios.post("/api/auth/register",{
        name,email,password
      })
      console.log(res.data);
      setLoading(false);
      router.push("/login")
    } catch (error) {
      console.log("Login Error : ",error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-white relative px-6 py-10 ">
      <div
        onClick={() => previousStep(1)}
        className=" back flex items-center absolute top-6 left-6 text-green-700 cursor-pointer"
      >
        <ArrowLeft /> <h1 className=" text-xl font-semibold">Back</h1>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" font-bold text-3xl"
      >
        Create an account
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" flex gap-1 text-sm my-2"
      >
        Join SnapCart Today <Leaf className="w-4 h-4 text-green-700" />{" "}
      </motion.p>

      <motion.form
      onSubmit={handleRegister}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <User className=" absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            placeholder="Your Name"
            className=" w-full border border-gray-300 rounded-xl
            py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className=" absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Your Email"
            className=" w-full border border-gray-300 rounded-xl
            py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Lock className=" absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            placeholder="Your Password"
            className="w-full border border-gray-300 rounded-xl
              py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className="absolute right-3 top-3.5 cursor-pointer w-5 h-5 text-green-500"
            />
          ) : (
            <EyeIcon
              onClick={() => setShowPassword(true)}
              className="absolute right-3 top-3.5 cursor-pointer w-5 h-5 text-green-500"
            />
          )}

          {(() => {
            const formValidation =
              name !== "" && email !== "" && password !== "";
            return (
              <button
                disabled={!formValidation || loading}
                className={` w-full py-2 my-2 rounded-xl transition-all duration-200 shadow-md inline-flex justify-center items-center
                ${formValidation ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                type="submit"
              >
                {loading ? <Loader2 className=" w-5 h-5 animate-spin" />: "Register"}
                
              </button>
            );
          })()}

          <div className=" text-center w-full mt-1 text-sm">
            OR
          </div>

          <div
          onClick={()=> signIn("google",{callbackUrl:"/"})}
          className="flex gap-2 items-center justify-center py-2 rounded-xl mt-1 border border-gray-400 cursor-pointer" >
            <Image src={googleLogo} height={20} width={20} alt="logo" />
            Continue with Google 
          </div>
        </div>
      </motion.form>
      <p className=" cursor-pointer mt-1">
        Already have an account?{" "}
        <span
          onClick={() => {
            router.push("/login");
          }}
          className=" text-green-600 cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
