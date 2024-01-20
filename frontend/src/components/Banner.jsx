import React from "react";

const Banner = ({heading, subHeading="products"}) => {
  return (
    <div className="w-full py-12 shadow-lg flex flex-col items-center z-0 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
      {/* <span className="text-8xl font-bold text-stone-300 tracking-[1.5rem] absolute top-9 right-[24%] -z-10">
        Sneakers
      </span> */}
      <span className="text-5xl font-bold text-stone-800">{heading}</span>
      <span>{subHeading}</span>
    </div>
  );
};

export default Banner;
