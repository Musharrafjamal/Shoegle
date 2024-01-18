import React, { useEffect, useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCartPlus } from "react-icons/fa6";
import axios from "axios";

const SecondaryProductCard = () => {
  const [fetchItems, setFetchItem] = useState([]);
  const localUrlGetItem = "http://localhost:8000/get-item";

  const fetchItem = async () => {
    const items = await axios.get(localUrlGetItem);
    setFetchItem(items.data);
  };
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

    fetchItem();
  }, []);
  const [idArray, setIdArray] = useState(
    JSON.parse(localStorage.getItem("idArray")) !== null
      ? JSON.parse(localStorage.getItem("idArray"))
      : []
  );

  const handleItemTOAddInCart = (id) => {
    setIdArray((prev) => [...prev, id]);
  };
  useEffect(() => {
    localStorage.setItem("idArray", JSON.stringify(idArray));
  }, [idArray]);
  return (
    <>
      {fetchItems.map((item, index) => {
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
              src={item.images[0]}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-xl font-semibold text-stone-800">
                {item.name}
              </h2>
              <p className="text-right">₹{item.price}</p>
            </div>
            <div
              onClick={() => {
                handleItemTOAddInCart(item._id);
              }}
              className="w-full"
            >
              <PrimaryBtn icon={<FaCartPlus size={20} />} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SecondaryProductCard;
