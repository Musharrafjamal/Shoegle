import React from "react";
import { Link } from "react-router-dom";

const SecondaryBtn = ({ content = "Add to cart", destination, icon }) => {
  return (
    <>
      <Link to={destination}>
        <button className="py-2 whitespace-nowrap px-4 cursor-pointer bg-white flex justify-center items-center gap-2 shadow-md border border-stone-300 text-sm text-stone-700 font-semibold rounded hover:border-transparent hover:shadow-none hover:text-white hover:scale-95 hover:bg-stone-700 transition-all duration-300">
          <span>{content}</span> {icon && <span>{icon}</span>}
        </button>
      </Link>
    </>
  );
};

export default SecondaryBtn;
