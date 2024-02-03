import React from "react";
import { Link } from "react-router-dom";

const PrimaryBtn = ({ content="Add to cart", icon, destination }) => {
  return (
    <Link to={destination}>
      <button className="px-4 py-2 w-full flex gap-2 justify-center items-center cursor-pointer bg-stone-700 text-sm text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300">
        {content && <span className="whitespace-nowrap">{content}</span>}{" "}
        {icon && <span>{icon}</span>}
      </button>
    </Link>
  );
};

export default PrimaryBtn;