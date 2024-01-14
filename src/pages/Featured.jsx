import React, { useEffect } from "react";
import Banner from "../components/Banner";
import img1 from "../assets/featured-img/1.jpg";
import img2 from "../assets/featured-img/2.jpg";
import img3 from "../assets/featured-img/3.jpg";
import img4 from "../assets/featured-img/4.jpg";
import img5 from "../assets/featured-img/5.jpg";
import img6 from "../assets/featured-img/6.jpg";
import PrimaryBtn from "../components/PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCartPlus } from "react-icons/fa6";

const Featured = () => {
  const items = [
    { name: "Green sneaker", price: 45, img: img1, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 45, img: img2, stars: 5.0, reviews: 142 },
    { name: "Green sneaker", price: 45, img: img3, stars: 4.0, reviews: 47 },
    { name: "Green sneaker", price: 45, img: img4, stars: 3.5, reviews: 72 },
    { name: "Green sneaker", price: 45, img: img5, stars: 2.5, reviews: 122 },
    { name: "Green sneaker", price: 45, img: img6, stars: 4.5, reviews: 90 },
    { name: "Green sneaker", price: 45, img: img2, stars: 3.5, reviews: 52 },
    { name: "Green sneaker", price: 45, img: img4, stars: 4.5, reviews: 12 },
  ];
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
      <Banner heading={"Featured"} />
      <div className="grid grid-cols-4 gap-8 py-8 px-20">
        {items.map((item, index) => {
          return (
            <div
              data-aos="zoom-in"
              key={index}
              className="border border-stone-300 flex flex-col gap-2 items-center rounded-lg p-6 cursor-pointer transition-all duration-300"
            >
              <div className="flex">
                {Array.from({ length: 5 }, (e, index) => {
                  let stars = item.stars;
                  return (
                    <span key={index} className="text-yellow-500">
                      {stars >= index + 1 ? (
                        <IoIosStar />
                      ) : stars >= index + 0.5 ? (
                        <IoIosStarHalf />
                      ) : (
                        <IoIosStarOutline />
                      )}
                    </span>
                  );
                })}
                <span className="text-sm">({item.reviews} reviews)</span>
              </div>
              <img
                src={item.img}
                alt={item.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-xl font-semibold text-stone-800">
                  {item.name}
                </h2>
                <p className="text-right">${item.price}</p>
              </div>
              <PrimaryBtn icon={<FaCartPlus size={20} />} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Featured;
