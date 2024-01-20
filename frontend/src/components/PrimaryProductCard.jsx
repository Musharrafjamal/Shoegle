import React, { useEffect, useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateArray } from "../redux/arrayOfId";

const PrimaryProductCard = () => {
  const [fetchItems, setFetchItem] = useState([]);
  const localUrlGetItem = "http://localhost:8000/get-item";
  const webGetItem = "https://shoegle-production.up.railway.app/get-item";
  const dispatch = useDispatch();

  const fetchItem = async () => {
    const items = await axios.get(webGetItem);
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
    const uniqueArray = Array.from(new Set(idArray));
    dispatch(updateArray(uniqueArray));
  }, [idArray]);
  return (
    <>
      {fetchItems.map((item, index) => {
        return (
          <div key={index} className="flex gap-2" data-aos="fade-in">
            <img
              src={item.images[0]}
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
              <p>₹{item.price}</p>
              <div
                onClick={() => {
                  handleItemTOAddInCart(item._id);
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
