import React from "react";
import logo from "../assets/logo/running.png";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Buttons from "./Buttons";
import SecondaryBtn from "./SecondaryBtn";
import { useSelector }from "react-redux"

const Nav = ({ alternate, btns }) => {
  const itemCount = useSelector(state => state.counter)
  return (
    <header className="flex justify-between items-center px-12 py-5">
      <Link to="/">
        <img src={logo} alt="" className="w-[3rem] h-[3rem]" />
        <span>Shoegle</span>
      </Link>
      {alternate ? (
        <nav className="flex gap-4 justify-center items-center text-stone-700">
          <Buttons btns={btns} />
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
                content={`Cart ${itemCount}`}
                icon={<FaCartShopping />}
                linkTag={true}
                destination={"/cart"}
              />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Nav;
