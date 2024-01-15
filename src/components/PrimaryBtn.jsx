import React from "react";
import { Link } from "react-router-dom";

const PrimaryBtn = ({
  content = "Add to cart",
  icon,
  destination,
  linkTag = false,
}) => {
  return linkTag ? (
    <Link
      to={destination}
      className="flex justify-center items-center gap-2 py-2 w-full cursor-pointer bg-stone-700 text-sm text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300"
    >
      {content} {icon}
    </Link>
  ) : (
    <a
      href={destination}
      className="flex justify-center items-center gap-2 py-2 w-full cursor-pointer bg-stone-700 text-sm text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300"
    >
      {content} {icon}
    </a>
  );
};

export default PrimaryBtn;
