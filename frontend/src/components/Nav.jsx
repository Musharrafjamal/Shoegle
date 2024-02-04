import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping, FaUserLock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import PrimaryBtn from "./PrimaryBtn";
import { IoLogOutOutline } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { MdTrendingUp } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";

const Nav = ({ alternate, btns }) => {
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

  const { user, loginWithRedirect, logout } = useAuth0();
  const [cartCounting, setCartCounting] = useState(0);

  const myArray = useSelector((state) => state.arrayOfId.myArray);
  useEffect(() => {
    if (Array.isArray(myArray) && myArray.length > 0) {
      const uniqueCartItemArray = Array.from(new Set(myArray));
      setCartCounting(uniqueCartItemArray.length);
    }
  }, [myArray.length]);

  return (
    <header className="flex justify-between items-center p-3 sm:px-10 sm:py-5">
      <Link to="/" className="flex flex-col justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shoegle-ce904.appspot.com/o/running.png?alt=media&token=6481f9f5-4e92-4db6-9cbc-9d71d2fc5fb3"
          alt=""
          className="w-10 h-10"
        />
        <span className="text-sm">Shoegle</span>
      </Link>
      <nav className="flex gap-4 justify-center items-center text-stone-700 ">
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
              isOpen ? "scale-x-125" : "scale-0"
            } flex absolute top-0 right-0 flex-col gap-3 origin-top-right ease-in-out transition-all duration-500 w-32 mt-8 bg-white rounded-lg shadow-md p-2 z-10`}
          >
            {alternate ? (
              <div>
                {btns.map((btn, index) => {
                  return (
                    <Link
                    key={index}
                      to={btn.destination}
                      className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-3 rounded flex items-center justify-center gap-1"
                    >
                      <span>{btn.content}</span> {btn.icon}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col">
                <a
                  href="/"
                  className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700  hover:bg-stone-600 hover:text-white py-3 rounded flex items-center justify-center gap-1"
                >
                  Home <TiHome />
                </a>
                <a
                  href="#featured"
                  className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-3 text-center rounded flex items-center justify-center gap-1"
                >
                  Featured <MdTrendingUp />
                </a>
                <a
                  href="#best-seller"
                  className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-3 text-center rounded flex items-center justify-center gap-1"
                >
                  Best seller <FaLightbulb />
                </a>
                <Link
                  to="/collection"
                  className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-3 text-center rounded flex items-center justify-center gap-1"
                >
                  Collection <BsFillCollectionFill />
                </Link>
                <Link
                  to="/cart"
                  className="transition-all duration-500 w-full text-sm ease-in-out font-semibold text-stone-700 whitespace-nowrap hover:bg-stone-600 hover:text-white py-3 text-center rounded flex items-center justify-center gap-1"
                >
                  Cart {cartCounting} <FaCartShopping />
                </Link>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <div className="relative flex items-center" ref={profileRef}>
            <button className="focus:outline-none" onClick={toggleProfileMenu}>
              <img
                className="w-10 h-10 rounded-full"
                src={
                  user && user.picture
                    ? user.picture
                    : "https://firebasestorage.googleapis.com/v0/b/shoegle-ce904.appspot.com/o/running.png?alt=media&token=6481f9f5-4e92-4db6-9cbc-9d71d2fc5fb3"
                }
                alt="Profile"
              />
            </button>
            {/* Profile Menu */}
            <div
              className={`${
                isProfileOpen ? "scale-x-125" : "scale-0"
              } absolute right-0 mt-36 flex flex-col bg-white rounded-lg shadow-md z-10 p-2 border origin-top-right ease-in-out transition-all duration-500`}
            >
              <span className="w-full py-2 rounded-lg text-sm whitespace-nowrap px-2 text-left">
                {user.name}
              </span>
              <button
                className="py-2 flex items-center gap-1 transition-all duration-500 rounded text-sm text-red-600 hover:bg-red-500 hover:text-white px-2 text-left"
                onClick={() => {
                  logout();
                }}
                title="logout"
              >
                Logout <IoLogOutOutline />
              </button>
            </div>
          </div>
        ) : (
          <span
            onClick={() => {
              loginWithRedirect();
            }}
          >
            <PrimaryBtn content="Login" icon={<FaUserLock />} />
          </span>
        )}
      </nav>
    </header>
  );
};

export default Nav;
