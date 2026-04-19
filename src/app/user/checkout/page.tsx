"use client";
import {
  ArrowLeft,
  Building,
  CreditCard,
  Home,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  Truck,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


import axios from "axios";
import dynamic from "next/dynamic";
// import { Marker, useMap } from "react-leaflet";
// import L,{ LatLngExpression } from "leaflet";

const CheckOutMap = dynamic(() => import("@/components/CheckoutMap"), { ssr: false });


const Checkout = () => {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const { finalTotal, subTotal, deliveryFee, cartData } = useSelector(
    (state: RootState) => state.cart,
  );
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    fullAdress: "",
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("cod");

  const handleSearchQueary = async () => {
    setSearchLoading(true);
    const {OpenStreetMapProvider}=await import("leaflet-geosearch");
    const provider = new OpenStreetMapProvider();
    const result = await provider.search({ query: searchQuery });
    if (result) {
      setSearchLoading(false);
      setPosition([result[0].y, result[0].x]);
      setSearchQuery("");
    }
  };

  const handleCod = async () => {
    try {
      if (!position) return null;
      const result = await axios.post("/api/user/order", {
        userId: userData?._id,
        items: cartData.map((item) => ({
          grocery: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          image: item.image,
        })),
        totalAmount: finalTotal,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          fullAddress: address.fullAdress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod,
      });
      
      router.push("/user/order-success")
    } catch (error) {
      console.log("Product Order COD Payment Error : ", error);
    }
  };

    const handleOnlinePayment = async () => {
    try {
      if (!position) return null;
      const result = await axios.post("/api/user/payment", {
        userId: userData?._id,
        items: cartData.map((item) => ({
          grocery: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          image: item.image,
        })),
        totalAmount: finalTotal,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          fullAddress: address.fullAdress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod,
      });
      
      window.location.href= result.data.url
    } catch (error) {
      console.log("Product Order Online Payment Error : ", error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          console.log(latitude, longitude);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          console.log(latitude, longitude);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({ ...prev, fullName: userData.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }));
    }
  }, [userData]);

  useEffect(() => {
    const fetchAdress = async () => {
      if (!position) return;
      try {
        const result = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
        );
        console.log(result.data);
        setAddress((prev) => ({
          ...prev,
          city: result.data.address.city ? result.data.address.city : "",
          state: result.data.address.state ? result.data.address.state : "",
          pincode: result.data.address.postcode
            ? result.data.address.postcode
            : "",
          fullAdress: result.data.display_name ? result.data.display_name : "",
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdress();
  }, [position]);



  return (
    <div className=" w-[92%] md:w-[80%] mx-auto py-10 relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => router.push("/user/cart")}
        className="flex gap-2 bg-green-700 hover:bg-green-800 duration-200 cursor-pointer py-2 px-4 rounded-2xl font-semibold text-white"
      >
        <ArrowLeft />
        <span>Back to Cart</span>
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=" text-center text-3xl md:text-4xl font-bold mb-10 text-green-700"
      >
        Checkout
      </motion.h1>

      <div className=" grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
          <h2 className=" text-xl font-semibold flex items-center gap-2 mb-4">
            <MapPin className=" text-green-700" /> Delivery Address
          </h2>

          <div className=" space-y-4">
            <div className=" relative">
              <User
                className=" absolute top-3 left-3 text-green-600"
                size={18}
              />
              <input
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullName: e.target.value || "",
                  }))
                }
                type="text"
                placeholder="Full Name"
                className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
              />
            </div>

            <div className=" relative">
              <Phone
                className=" absolute top-3 left-3 text-green-600"
                size={18}
              />
              <input
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    mobile: e.target.value || "",
                  }))
                }
                type="text"
                placeholder="Mobile"
                className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
              />
            </div>

            <div className=" relative">
              <Home
                className=" absolute top-3 left-3 text-green-600"
                size={18}
              />
              <input
                value={address.fullAdress}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullAdress: e.target.value || "",
                  }))
                }
                type="text"
                placeholder="Full Address"
                className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
              />
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className=" relative">
                <Building
                  className=" absolute top-3 left-3 text-green-600"
                  size={18}
                />
                <input
                  value={address.city}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      city: e.target.value || "",
                    }))
                  }
                  type="text"
                  placeholder="City"
                  className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
                />
              </div>

              <div className=" relative">
                <Navigation
                  className=" absolute top-3 left-3 text-green-600"
                  size={18}
                />
                <input
                  value={address.state}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      state: e.target.value || "",
                    }))
                  }
                  type="text"
                  placeholder="State"
                  className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
                />
              </div>

              <div className=" relative">
                <Search
                  className=" absolute top-3 left-3 text-green-600"
                  size={18}
                />
                <input
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pincode: e.target.value || "",
                    }))
                  }
                  type="text"
                  placeholder="Pincode"
                  className=" w-full py-2 px-10 border border-gray-200 rounded-2xl placeholder:text-gray-500 focus:outline-green-400 "
                />
              </div>
            </div>

            <div className=" flex gap-2 mt-3 flex-wrap items-center justify-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or area..."
                className=" flex-1 border rounded-2xl py-2 px-4 text-sm focus:outline-green-500"
              />
              <button
                onClick={handleSearchQueary}
                type="button"
                className=" px-5 py-2 text-white font-medium bg-green-600 hover:bg-green-700 cursor-pointer transition-all rounded-lg"
              >
                {searchLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </div>

            <div className=" relative  mt-6 h-82.5 rounded-xl overflow-hidden  border border-gray-700 shadow-inner ">
              {position && (
                <div className="w-full h-full">
                  <CheckOutMap position={position} setPosition={setPosition} />
                </div>
              )}
              <motion.button
                onClick={handleCurrentLocation}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer absolute bottom-5 z-999 right-4 flex items-center justify-center bg-green-600 text-white  p-2 rounded-full"
              >
                <LocateFixed size={22} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white h-fit p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
          <h2 className=" flex items-center gap-2 text-gray-800 mb-4 font-semibold">
            <CreditCard className=" text-green-600" /> Payment Method
          </h2>
          <div className=" space-y-4 mb-6">
            <button
              className={` cursor-pointer flex items-center gap-3 border-2  border-black w-full p-3 rounded-lg transition-all
                ${paymentMethod === "online" ? " bg-green-50 border-green-600 shadow-sm" : " hover:bg-gray-50"}
                `}
              onClick={() => setPaymentMethod("online")}
            >
              <CreditCard className=" text-green-600" />{" "}
              <span> Pay Online (Stripe)</span>
            </button>
            <button
              className={` cursor-pointer flex items-center gap-3 border-2  border-black w-full p-3 rounded-lg transition-all
                ${paymentMethod === "cod" ? " bg-green-50 border-green-600 shadow-sm" : " hover:bg-gray-50"}
                `}
              onClick={() => setPaymentMethod("cod")}
            >
              <Truck className=" text-green-600" />{" "}
              <span> Cash On Delivery </span>
            </button>
          </div>
          <div className=" border-t pt-4 text-gray-700 text-sm sm:text-base space-y-2">
            <div className=" flex justify-between">
              <span>Subtotal</span>
              <span className=" font-semibold text-green-600">
                ₹ {subTotal}
              </span>
            </div>
            <div className=" flex justify-between">
              <span>Delivery Fee</span>
              <span className=" font-semibold text-green-600">
                ₹ {deliveryFee}
              </span>
            </div>
            <div className=" flex justify-between border-t font-bold text-lg pt-3">
              <span>Final Total</span>
              <span className=" font-semibold text-green-600">
                ₹ {finalTotal}
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="mt-6 w-full bg-green-600 py-3 rounded-full hover:bg-green-700 transition-all cursor-pointer text-white font-semibold"
            onClick={() => {
              if (paymentMethod === "cod") {
                handleCod();
              } else {
                handleOnlinePayment();
              }
            }}
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
