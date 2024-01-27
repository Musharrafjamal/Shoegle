import React, { useEffect, useState } from "react";
import logo from "../assets/logo/running.png";
import { Link } from "react-router-dom";
import { FaCartShopping, FaUserLock } from "react-icons/fa6";
import Buttons from "./Buttons";
import SecondaryBtn from "./SecondaryBtn";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import PrimaryBtn from "./PrimaryBtn";
import { IoLogOutOutline } from "react-icons/io5";

const Nav = ({ alternate, btns }) => {
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
    <header className="flex justify-between items-center px-12 py-5">
      <Link to="/">
        <img src={logo} alt="" className="w-[3rem] h-[3rem]" />
        <span>Shoegle</span>
      </Link>
      {alternate ? (
        <nav className="flex gap-4 justify-center items-center text-stone-700 ">
          <Buttons btns={btns} />
          {user ? (
            <span className="flex gap-2 items-center border border-stone-300 px-4 py-1 rounded-xl shadow-md shadow-stone-400">
              <div className="wrapper">
                <div>
                  <a href="#" className="span-tooltip">
                    <i>
                      <img
                        src={user && user.picture ? user.picture : ""}
                        alt="profile-img"
                        className="rounded-full"
                      />
                    </i>
                    <span>{user.name}</span>
                  </a>
                </div>
              </div>

              <button
                className="text-2xl"
                onClick={() => {
                  logout();
                }}
                title="logout"
              >
                <IoLogOutOutline />
              </button>
            </span>
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
      ) : (
        <nav className="flex gap-6 justify-center items-center">
          <a
            href="/"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700 text-sm whitespace-nowrap hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Home
          </a>
          <a
            href="#featured"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700 text-sm whitespace-nowrap hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Featured
          </a>
          <a
            href="#best-seller"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700 text-sm whitespace-nowrap hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Best seller
          </a>
          <Link
            to="/collection"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700 text-sm whitespace-nowrap hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Collection
          </Link>
          <SecondaryBtn
            content={`Cart ${cartCounting}`}
            icon={<FaCartShopping />}
            linkTag={true}
            destination={"/cart"}
          />
          {user ? (
            <span className="flex gap-2 items-center border border-stone-300 px-4 py-1 rounded-xl shadow-md shadow-stone-400">
              <div className="wrapper">
                <div>
                  <a href="#" className="span-tooltip">
                    <i>
                      <img
                        src={user && user.picture ? user.picture : ""}
                        alt="profile-img"
                        className="rounded-full"
                      />
                    </i>
                    <span>{user.name}</span>
                  </a>
                </div>
              </div>
              <button
                className="text-2xl"
                onClick={() => {
                  logout();
                }}
                title="logout"
              >
                <IoLogOutOutline />
              </button>
            </span>
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
      )}
    </header>
  );
};

export default Nav;
