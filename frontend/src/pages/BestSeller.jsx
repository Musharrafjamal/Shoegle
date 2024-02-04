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
      <div className="flex flex-wrap justify-evenly p-4 gap-4">
        <PrimaryProductCard />
      </div>
      <div className=" flex justify-center pb-10">
          <SecondaryBtn content="View all product" icon={<FaArrowUpRightFromSquare />} destination={"/collection"} />
      </div>
      <Footer />
    </>
  );
};

export default BestSeller;
