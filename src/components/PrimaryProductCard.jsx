import React, { useEffect } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { increment } from "../redux/itemCounterSlice";
import { useSelector, useDispatch } from "react-redux";

const PrimaryProductCard = ({ items }) => {
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
          <div key={index} className="flex gap-2" data-aos="fade-up">
            <img
              src={item.img}
              alt=""
              className="w-1/3 aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center gap-1 ">
              <span className="text-lg font-semibold">{item.name}</span>
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
              <p>${item.price}</p>
              <div
                onClick={() => {
                  dispatch(increment());
                }}
              >
                <PrimaryBtn icon={<FaCartPlus size={20} />} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PrimaryProductCard;
