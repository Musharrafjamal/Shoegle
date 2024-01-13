import React from "react";
import logo from "../assets/logo/running.png";

const Nav = () => {
  return (
    <header className="flex justify-between items-center px-12 py-5">
      <a href="/">
        <img src={logo} alt="" className="w-[3rem] h-[3rem]" />
        <span>Shoegle</span>
      </a>
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
        <a
          href="#collection"
          className="transition-all duration-300 ease-in-out font-semibold text-stone-700  hover:scale-110 hover:bg-gradient-to-r from-red-500 to-blue-500 hover:bg-clip-text hover:text-transparent"
        >
          Collection
        </a>
      </nav>
    </header>
  );
};

export default Nav;
