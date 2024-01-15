import React from "react";
import { Link } from "react-router-dom";

const SecondaryBtn = ({
  content = "Add to cart",
  destination,
  icon,
  linkTag = false,
}) => {
  return (
    <>
      {linkTag ? (
        <Link to={destination}>
          <button className="py-2 w-full cursor-pointer flex justify-center items-center gap-2 shadow-xl border border-stone-400 text-sm text-stone-700 font-semibold rounded hover:border-transparent hover:shadow-none hover:text-white hover:scale-95 hover:bg-stone-700 transition-all duration-300">
            {content} {icon}
          </button>
        </Link>
      ) : (
        <a href={destination}>
          <button className="py-2 w-full cursor-pointer flex justify-center items-center gap-2 shadow-xl border border-stone-400 text-sm text-stone-700 font-semibold rounded hover:border-transparent hover:shadow-none hover:text-white hover:scale-95 hover:bg-stone-700 transition-all duration-300">
            {content} {icon}
          </button>
        </a>
      )}
    </>
  );
};

export default SecondaryBtn;
