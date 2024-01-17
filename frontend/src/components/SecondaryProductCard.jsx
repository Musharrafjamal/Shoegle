import React, { useEffect } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCartPlus } from "react-icons/fa6";
import { increment } from "../redux/itemCounterSlice";
import { useDispatch } from "react-redux";

const SecondaryProductCard = ({ items }) => {
  const dispatch = useDispatch();
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
            <div onClick={() => dispatch(increment())} className="w-full">
              <PrimaryBtn icon={<FaCartPlus size={20} />} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SecondaryProductCard;
