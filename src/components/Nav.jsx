import React from "react";
import logo from "../assets/logo/running.png";
import { Link } from "react-router-dom";

const Nav = ({ alternate }) => {
  return (
    <header className="flex justify-between items-center px-12 py-5">
      <a href="/">
        <img src={logo} alt="" className="w-[3rem] h-[3rem]" />
        <span>Shoegle</span>
      </a>
      {alternate ? (
        <nav>
          <Link
            to="/"
            className="py-3 px-8 shadow-xl border border-stone-400 text-sm text-black rounded hover:border-transparent hover:text-white hover:scale-95 hover:bg-stone-700 transition-all duration-300"
          >
            Home
          </Link>
        </nav>
      ) : (
        <nav className="flex gap-8">
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
        </nav>
      )}
    </header>
  );
};

export default Nav;
