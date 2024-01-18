import React, { useEffect } from "react";
import Banner from "../components/Banner";
import AOS from "aos"
import "aos/dist/aos.css";
import SecondaryBtn from "../components/SecondaryBtn";
import Footer from "../components/Footer"
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import PrimaryProductCard from "../components/PrimaryProductCard";

const BestSeller = () => {
  useEffect(() => {
    AOS.init(
      {
        duration: 1200,
        easing: "ease-in-out",
      },
      (error) => {
        if (error) {
          console.error("AOS initialization error:", error);
        }
      }
    );
  }, []);
  return (
    <>
      <Banner heading={"Best seller"} data-aos="flip-left" />
      <div className="grid grid-cols-3 py-12 px-20 gap-x-8 gap-y-16 ">
        <PrimaryProductCard />
      </div>
      <div className=" flex justify-center pb-10">
        <span className="w-1/6">
          {/* <PrimaryBtn content="View all product" /> */}
          <SecondaryBtn content="View all product" icon={<FaArrowUpRightFromSquare />} destination={"/collection"} />
        </span>
      </div>
      <Footer />
    </>
  );
};

export default BestSeller;
