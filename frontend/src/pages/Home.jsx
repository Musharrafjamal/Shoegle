import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Img from "../assets/img/home-img.webp";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
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
    <div className="h-screen bg-gradient-to-b from-transparent relative to-[rgba(0,0,0,0.4)]">
      <Nav />
      <div className="flex justify-center items-center h-4/6 ">
      <img data-aos="fade-down" src={Img} alt="" className="w-4/6 md:w-2/6 absolute top-2/6 left-1/6 -z-10 float-animation" />
        <span
          data-aos="fade-up"
          className="text-7xl sm:text-[10rem] md:text-[12rem] lg:text-[15rem] font-semibold bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent"
        >
          Shoegle
        </span>
      </div>
    </div>
  );
};

export default Home;
