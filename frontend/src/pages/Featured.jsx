import React from "react";
import Banner from "../components/Banner";
import SecondaryProductCard from "../components/SecondaryProductCard";

const Featured = () => {


  return (
    <>
      <Banner heading={"Featured"} />
      <div className="flex flex-wrap justify-evenly py-10 px-4 gap-8">
        <SecondaryProductCard />
      </div>
    </>
  );
};

export default Featured;
