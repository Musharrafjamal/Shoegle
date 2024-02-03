import React, { useEffect, useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { FaCartPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "../redux/arrayOfId";
import { Link } from "react-router-dom";
import ShowRatings from "./ShowRatings";

const PrimaryProductCard = () => {
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
            className=" w-[17.5rem] flex gap-2 p-4 bg-stone-100 rounded"
          >
            <Link
              to={`/product/${item._id}`}
              className="min-w-24 w-24"
            >
              <img
                src={item.images[0]}
                alt=""
                className="w-full aspect-square object-cover rounded-md"
              />
            </Link>
            <div className="flex flex-col justify-center gap-1">
              <Link
                to={`/product/${item._id}`}
                className="flex flex-col justify-center gap-1"
              >
                <span className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-4/5">
                  {item.name}
                </span>
                <div className="flex items-start">
                  <ShowRatings reviews={item.reviews} />
                </div>
                <p>₹{item.price}</p>
              </Link>
              <div
                onClick={() => {
                  handleItemTOAddInCart(item._id);
                }}
              >
                <button className="p-2 flex gap-1 justify-center items-center cursor-pointer bg-stone-700 text-xs text-white rounded hover:scale-95 hover:bg-stone-800 transition-all duration-300">
                  Add to cart <FaCartPlus size={15} />
                </button>
                {/* <PrimaryBtn icon={<FaCartPlus size={20} />} /> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PrimaryProductCard;
