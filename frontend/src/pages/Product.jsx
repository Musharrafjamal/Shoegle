import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [cartCounting, setCartCounting] = useState(0);

  const myArray = useSelector((state) => state.arrayOfId.myArray);
  useEffect(() => {
    if (Array.isArray(myArray) && myArray.length > 0) {
      const uniqueCartItemArray = Array.from(new Set(myArray));
      setCartCounting(uniqueCartItemArray.length);
    }
  }, [myArray.length]);

  const btns = [
    {
      content: "Home",
      destination: "/",
      secondary: true,
      linkTag: true,
      width: "w-24",
    },
    {
      content: "Collection",
      destination: "/collection",
      secondary: true,
      linkTag: true,
      width: "w-24",
    },
    {
      content: `Cart ${cartCounting}`,
      destination: "/cart",
      linkTag: true,
      icon: <FaCartShopping />,
      width: "w-24",
    },
  ];
  const [fetchItems, setFetchItem] = useState([]);
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getItemUrl = `${backendUrl}/item`;
  const getItem = async () => {
    try {
      const items = await axios.post(getItemUrl, { id });
      setFetchItem(items.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    // console.log(fetchItems);
  }, [fetchItems]);
  // const { _id, name, description, price, images, reviews } = fetchItems;
  return (
    <div>
      <Nav btns={btns} alternate={true} />
      {fetchItems.length !== 0 ? (
        <div className="px-10">
          <div className="flex flex-col gap-8">
            <div className="w-2/5">
              <img
                src={fetchItems.images[0]}
                alt="images-1"
                className="aspect-square object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/12">
                <img
                  src={fetchItems.images[0]}
                  alt="images-2"
                  className=" aspect-square object-cover rounded"
                />
              </div>
              <div className="w-1/12">
                <img
                  src={fetchItems.images[1]}
                  alt="images-3"
                  className=" aspect-square object-cover rounded"
                />
              </div>
              <div className="w-1/12">
                <img
                  src={fetchItems.images[2]}
                  alt="images-4"
                  className=" aspect-square object-cover rounded"
                />
              </div>
              <div className="w-1/12">
                <img
                  src={fetchItems.images[3]}
                  alt="images-5"
                  className=" aspect-square object-cover rounded"
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <span>Locading...</span>
      )}
    </div>
  );
};

export default Product;
