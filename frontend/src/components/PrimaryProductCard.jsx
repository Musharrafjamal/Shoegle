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
          <div key={index} className="flex gap-2 min-w-64 w-full p-4" data-aos="fade-in">
            <Link to={`/product/${item._id}`} className=" min-w-32 w-32 flex items-center">
              <img
                src={item.images[0]}
                alt=""
                className="w-full aspect-square object-cover rounded-lg"
              />
            </Link>
            <div className="flex flex-col justify-center gap-1">
              <Link
                to={`/product/${item._id}`}
                className="flex flex-col justify-center gap-1"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <ShowRatings rating={item.stars} reviews={item.reviews} />
                <p>₹{item.price}</p>
              </Link>
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
