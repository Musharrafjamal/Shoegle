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
      <img data-aos="fade-down" src={Img} alt="" className="w-1/3 absolute top-2/6 left-1/3 -z-10 float-animation" />
      <div className="flex justify-center items-center h-4/6 ">
        <span
          data-aos="fade-up"
          className="text-[12rem] font-semibold bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent"
        >
          Shoegle
        </span>
      </div>
    </div>
  );
};

export default Home;
