import React from "react";

const PrimaryBtn = ({ content = "Add to cart", icon }) => {
  return (
    <button className="flex justify-center items-center gap-2 py-2 w-full bg-stone-700 text-sm text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300">
      {content} {icon}
    </button>
  );
};

export default PrimaryBtn;
