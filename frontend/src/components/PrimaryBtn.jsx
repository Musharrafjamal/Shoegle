import React from "react";
import { Link } from "react-router-dom";

const PrimaryBtn = ({
  content = "Add to cart",
  icon,
  destination,
}) => {
  return (
    <Link
      to={destination}
      className="flex justify-center px-4 items-center gap-2 py-2 cursor-pointer bg-stone-700 text-sm text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300"
    >
      <span>{content}</span> {icon && <span>{icon}</span>}
    </Link>
  );
};

export default PrimaryBtn;
