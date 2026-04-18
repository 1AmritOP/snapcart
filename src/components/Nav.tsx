"use client";
import { IUser } from "@/models/user.model";
import {
  Boxes,
  CirclePlus,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  Search,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Nav = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);

  const {cartData}=useSelector((state:RootState)=> state.cart)

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const sidebar = menuOpen
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            exit={{ opacity: 0, x: -100 }}
            className=" fixed top-0 left-0 w-[75%] sm:w-[60%] z-50 h-full bg-linear-to-b from-green-800/90 via-green-700/80 to-green-900/90 
            backdrop-blur-xl border-r border-green-400/20 flex flex-col gap-2 p-6 text-white"
          >
            <div className="heading flex justify-between items-center">
              <div className="left text-xl font-extrabold">Admin Panel</div>
              <div onClick={() => setMenuOpen(false)}>
                {" "}
                <X />{" "}
              </div>
            </div>

            <div className="profile mt-4 flex gap-2 items-center p-2 bg-white/10 hover:bg-white/20 h-20 rounded-2xl">
              <div className="left relative h-12 w-12 flex items-center justify-center rounded-full overflow-hidden">
                {user.image ? (
                  <Image src={user?.image} fill alt="user image" />
                ) : (
                  <User />
                )}
              </div>
              <div className="right">
                <div className="name">{user.name}</div>
                <div className="role text-gray-200 text-sm font-semibold">
                  {user.role}
                </div>
              </div>
            </div>

            <div className="options flex flex-col gap-3 mt-8">
              <Link
                href={"/admin/add-grocery"}
                className="add bg-white/10 hover:bg-white/20 flex gap-2 items-center px-2 py-3 rounded-lg font-semibold"
              >
                <CirclePlus className=" w-6 h-6" /> Add Grocery
              </Link>

              <Link
                href={""}
                className="add bg-white/10 hover:bg-white/20 flex gap-2 items-center px-2 py-3 rounded-lg font-semibold"
              >
                <Boxes className=" w-6 h-6" /> View Grocery
              </Link>

              <Link
                href={"/admin/manage-orders"}
                className="add bg-white/10 hover:bg-white/20 flex gap-2 items-center px-2 py-3 rounded-lg font-semibold"
              >
                <PackageCheck className=" w-6 h-6" /> Manage Orders
              </Link>
            </div>

            <hr className=" mt-3" />

            <div
              onClick={ async() =>await signOut({callbackUrl:"/"})}
              className="logout bg-white/10 hover:bg-white/20 flex gap-2 items-center px-2 py-3 rounded-lg font-semibold"
            >
              <LogOut className=" w-6 h-6" /> Logout
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <nav className=" flex items-center justify-between h-16 bg-green-500 px-4 md:px-8 shadow-black/30 shadow-lg ">
      <Link href="/">
        <h1 className=" text-2xl font-bold text-white">SnapCart</h1>
      </Link>

      {user.role == "user" && (
        <form className=" hidden md:flex bg-white px-4 py-2 rounded-full w-1/2 max-w-lg">
          <Search className=" mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search groceries..."
            className=" w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </form>
      )}

      <div className=" flex gap-3 md:gap-6 items-center relative ">
        {user.role == "user" && (
          <>
            <div
              onClick={() => setSearchBarOpen((prev) => !prev)}
              className=" md:hidden bg-white h-11 w-11 rounded-full  flex justify-center items-center"
            >
              <Search className=" text-green-500 h-6 w-6" />
            </div>

            <Link
              href={"/user/cart"}
              className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center"
            >
              <ShoppingCartIcon className=" text-green-500 h-6 w-6" />
              <span className="absolute top-0 right-0 w-5 h-5 text-sm font-bold bg-red-500 rounded-full flex items-center justify-center text-white">
                {cartData?.length}
              </span>
            </Link>
          </>
        )}

        {user.role == "admin" && (
          <>
            <div className=" hidden md:flex items-center gap-4">
              <Link
                href={"/admin/add-grocery"}
                className="bg-white py-2 px-4 font-semibold  rounded-full flex items-center justify-center hover:bg-green-100 text-green-700 gap-1 transition-all"
              >
                {" "}
                <CirclePlus /> Add Grocery
              </Link>
              <Link
                href={""}
                className="bg-white py-2 px-4 font-semibold  rounded-full flex items-center justify-center hover:bg-green-100 text-green-700 gap-1 transition-all"
              >
                {" "}
                <Boxes /> View Groceries
              </Link>
              <Link
                href={"/admin/manage-orders"}
                className="bg-white py-2 px-4 font-semibold  rounded-full flex items-center justify-center hover:bg-green-100 text-green-700 gap-1 transition-all"
              >
                {" "}
                <PackageCheck /> Manage Orders
              </Link>
            </div>
            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className=" md:hidden bg-white h-10 w-10 rounded-full  flex justify-center items-center"
            >
              <Menu className="text-green-700 w-6 h-6" />
            </div>
          </>
        )}

        <div className=" relative" ref={profileDropDown}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className=" w-11 h-11 flex items-center justify-center bg-white rounded-full overflow-hidden relative hover:scale-110 transition-all cursor-pointer"
          >
            {user.image ? (
              <Image src={user?.image} fill alt="user image" />
            ) : (
              <User />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
              >
                <div className=" absolute z-10 right-0 mt-3 p-2 bg-white w-56  rounded-2xl">
                  <div className="flex items-center gap-2 px-2">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ">
                      {user.image ? (
                        <Image src={user?.image} fill alt="user image" />
                      ) : (
                        <User />
                      )}
                    </div>
                    <div>
                      <div className=" text-gray-800 font-semibold capitalize">
                        {user.name}
                      </div>
                      <div className=" text-sm text-gray-600 capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  {user.role == "user" && (
                    <Link
                      href={"/user/my-orders"}
                      onClick={() => setOpen((prev) => !prev)}
                      className="flex items-center gap-2 p-3 mt-1 hover:bg-green-100 rounded-xl cursor-pointer"
                    >
                      <Package className="text-green-600 w-5 h-5 " />
                      My Orders
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    type="button"
                    className=" p-3 flex gap-2 hover:bg-red-300 rounded-xl w-full h-full cursor-pointer "
                  >
                    <LogOut className=" text-red-600" />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className=" bg-white fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[90%] px-4 py-2 rounded-full flex items-center gap-2"
              >
                <Search />
                <form className="grow">
                  <input
                    type="text"
                    placeholder="Search Groceries..."
                    className=" w-full text-gray-700 outline-none "
                  />
                </form>
                <button onClick={() => setSearchBarOpen((prev) => !prev)}>
                  <X className=" w-5 h-5 text-gray-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {sidebar}
    </nav>
  );
};

export default Nav;
