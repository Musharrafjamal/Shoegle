import React from "react";
import Nav from "../components/Nav";
import Img from "../assets/img/home-img.png";

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-transparent relative to-[rgba(0,0,0,0.4)]">
      <Nav />
      <img src={Img} alt="" className="w-1/3 absolute top-2/6 left-1/3 -z-10" />
      <div className="flex justify-center items-center h-4/6 ">
        <span className="text-[12rem] font-semibold bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent">
          Shoegle
        </span>
      </div>
    </div>
  );
};

export default Home;
