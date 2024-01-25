import React, { useEffect, useState } from "react";
import logo from "../assets/logo/running.png";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Buttons from "./Buttons";
import SecondaryBtn from "./SecondaryBtn";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = ({ alternate, btns }) => {
  const { user } = useAuth0();
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
          <span className="h-12 w-12">
            {user ? (
              <img
                src={user && user.picture ? user.picture : ""}
                alt="profile-img"
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <div className="img-loader"></div>
            )}
          </span>
        </nav>
      ) : (
        <nav className="flex gap-8 justify-center items-center">
          <a
            href="/"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700  hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Home
          </a>
          <a
            href="#featured"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700  hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Featured
          </a>
          <a
            href="#best-seller"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700  hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Best seller
          </a>
          <Link
            to="/collection"
            className="transition-all duration-300 ease-in-out font-semibold text-stone-700  hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
          >
            Collection
          </Link>
          <div className="w-20">
            <SecondaryBtn
              content={`Cart ${cartCounting}`}
              icon={<FaCartShopping />}
              linkTag={true}
              destination={"/cart"}
            />
          </div>
          <span className="h-12 w-12">
            {user ? (
              <img
                src={user && user.picture ? user.picture : ""}
                alt="profile-img"
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <div className="img-loader"></div>
            )}
          </span>
        </nav>
      )}
    </header>
  );
};

export default Nav;
