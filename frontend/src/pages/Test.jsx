import React, { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../components/PrimaryBtn";
import { FaCartShopping } from "react-icons/fa6";
import SecondaryBtn from "../components/SecondaryBtn";
import { Link } from "react-router-dom";

const Test = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();
  let profileRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (!profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsProfileOpen(false);
  };
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsOpen(false);
  };
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    //   <div className="h-32 bg-purple-600"></div>
    //   <div className="h-32 bg-purple-600"></div>
    //   <div className="h-32 bg-purple-600"></div>
    //   <div className="h-32 bg-purple-600"></div>
    //   <div className="h-32 bg-purple-600"></div>
    // </div>
    <header className="flex items-center justify-between py-4 p-6">
      <div className="">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shoegle-ce904.appspot.com/o/running.png?alt=media&token=6481f9f5-4e92-4db6-9cbc-9d71d2fc5fb3"
          alt=""
          className="w-10 h-10"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-end" ref={menuRef}>
          <button
            className="text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300 transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          {/* Menu Items */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } absolute top-0 right-0 flex-col gap-3 w-48 mt-6 bg-white rounded-lg shadow-md pb-4`}
          >
            <a
              href="/"
              className="transition-all duration-500 ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-2 text-center rounded-lg"
            >
              Home
            </a>
            <a
              href="#featured"
              className="transition-all duration-500 ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-2 text-center rounded-lg"
            >
              Featured
            </a>
            <a
              href="#best-seller"
              className="transition-all duration-500 ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-2 text-center rounded-lg"
            >
              Best seller
            </a>
            <Link
              to="/collection"
              className="transition-all duration-500 ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-2 text-center rounded-lg"
            >
              Collection
            </Link>
            <div className="flex justify-center">
              <SecondaryBtn
                content={`Cart 2`}
                icon={<FaCartShopping />}
                linkTag={true}
                destination={"/cart"}
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center" ref={profileRef}>
          <button className="focus:outline-none" onClick={toggleProfileMenu}>
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/50"
              alt="Profile"
            />
          </button>
          {/* Profile Menu */}
          <div
            className={`${
              isProfileOpen ? "block" : "hidden"
            } absolute right-0 mt-40 bg-white rounded-lg shadow-md py-2 px-4`}
          >
            <a href="#" className="block py-1">
              Profile
            </a>
            <a href="#" className="block py-1">
              Settings
            </a>
            <a href="#" className="block py-1">
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Test;
