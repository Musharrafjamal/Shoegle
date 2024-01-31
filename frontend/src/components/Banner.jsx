import React from "react";

const Banner = ({ heading, subHeading = "products" }) => {
  return (
    <div className="w-full py-12 flex flex-col items-center z-0 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 border border-x-0 border-stone-400">
      <span className="text-5xl font-bold text-stone-800">{heading}</span>
      <span>{subHeading}</span>
    </div>
  );
};

export default Banner;
