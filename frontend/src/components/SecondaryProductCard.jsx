import React, { useEffect, useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCartPlus } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "../redux/arrayOfId";
import { Link } from "react-router-dom";
import ShowRatings from "./ShowRatings";

const SecondaryProductCard = () => {
  const [fetchItems, setFetchItem] = useState([]);
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getItemUrl = `${backendUrl}/get-item`;
  const dispatch = useDispatch();

  const fetchItem = async () => {
    const items = await axios.get(getItemUrl);
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
    const idWithQuantity = { id, quantity: 1 };
    setIdArray((prev) => [...prev, idWithQuantity]);
  };
  useEffect(() => {
    const uniqueData = Array.from(new Set(idArray.map((item) => item.id))).map(
      (uniqueId) => {
        const itemWithUniqueId = idArray.find((item) => item.id === uniqueId);
        return { id: uniqueId, quantity: itemWithUniqueId.quantity };
      }
    );
    localStorage.setItem("idArray", JSON.stringify(uniqueData));
    dispatch(updateArray(uniqueData));
  }, [idArray]);
  return (
    <>
      {fetchItems.map((item, index) => {
        return (
          <div
            key={index}
            className=" w-52 flex flex-col gap-2 items-center p-6 border border-stone-200 shadow-md shadow-stone-300 rounded-lg"
          >
            <Link
              to={`/product/${item._id}`}
              className="flex flex-col gap-2 items-center rounded"
            >
              <ShowRatings rating={item.stars} reviews={item.reviews} />

              <div className="min-w-24 w-24">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-xl font-semibold text-center text-stone-800 w-36 truncate">
                  {item.name}
                </h2>
                <p className="text-center w-full">₹{item.price}</p>
              </div>
            </Link>
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
