import React from "react";
import Banner from "../components/Banner";
import SecondaryProductCard from "../components/SecondaryProductCard";

const Featured = () => {


  return (
    <>
      <Banner heading={"Featured"} />
      <div className="grid grid-cols-4 gap-8 py-8 px-16">
        <SecondaryProductCard />
      </div>
    </>
  );
};

export default Featured;
