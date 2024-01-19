import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaCartShopping } from "react-icons/fa6";

import { increment, decrement } from "../redux/itemCounterSlice";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const Cart = () => {
  const itemCounter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
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
      linkTag: true,
      icon: <FaCartShopping />,
      width: "w-28",
    },
  ];
  const [fetchItems, setFetchItem] = useState([]);
  const localUrlGetItem = "http://localhost:8000/get-cart-item";

  const arrayOfId = JSON.parse(localStorage.getItem("idArray"));
  const uniqueArrayOfId = Array.from(new Set(arrayOfId));
  const fetchItem = async () => {
    const items = await axios.post(localUrlGetItem, { id: uniqueArrayOfId });
    setFetchItem(items.data);
  };
  useEffect(() => {
    fetchItem();

    // Left to work on the quantity manage section!!!!!!!!!!!!!
    // Left to work on the remove item from redux-state!!!!!!!!!!!!!

    const originalArray = JSON.parse(localStorage.getItem("idArray"));
    const uniqueArray = Array.from(new Set(originalArray));

    const duplicateArray = originalArray.filter(
      (id, index) => originalArray.indexOf(id) !== index
    );

    // console.log("Unique IDs:", uniqueArray);
    // console.log("Duplicate IDs:", duplicateArray);
  }, []);

  const handleRemoveItem = (id) => {
    const currentArray = JSON.parse(localStorage.getItem("idArray"));
    const newArray = fetchItems.filter((e, i) => e._id !== id);
    setFetchItem(newArray)
    localStorage.setItem("idArray", JSON.stringify(newArray));
    // fetchItem();
  };
  return (
    <>
      <Nav alternate={true} btns={btns} />
      <div className="bg-stone-300 h-screen  flex">
        <main className="bg-white w-9/12">
          <div className="w-full flex justify-between items-center px-10 py-4 shadow-lg border-stone-300">
            <span className="text-2xl font-semibold text-stone-800">
              Shpping cart
            </span>
            <span className="text-2xl font-semibold text-stone-800">
              {uniqueArrayOfId.length} Items
            </span>
          </div>
          <div className="flex flex-col gap-6 py-8">
            <div className="flex px-10 justify-between text-stone-700">
              <span className="w-2/5">Product List</span>
              <span className="w-1/5 text-center">Quantity</span>
              <span className="w-1/5 text-center">Price</span>
              <span className="w-1/5 text-center">Total</span>
            </div>
            {fetchItems.map((item, index) => {
              return (
                <div
                  className="flex px-10 justify-between text-stone-700"
                  key={index}
                >
                  <span className="flex gap-2 w-2/5">
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span>
                      <div className="text-lg font-semibold">{item.name}</div>
                      <button
                        onClick={() => {
                          handleRemoveItem(item._id);
                        }}
                        className="text-red-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </span>
                  </span>
                  <span className="w-1/5 flex h-full gap-2 items-center justify-center">
                    <button
                      className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                      onClick={() => {
                        if (itemCounter > 1) {
                          dispatch(decrement());
                        }
                      }}
                    >
                      -
                    </button>
                    <span>{itemCounter}</span>
                    <button
                      className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                      onClick={() => {
                        dispatch(increment());
                      }}
                    >
                      +
                    </button>
                  </span>
                  <span className="w-1/5 text-center">₹{item.price}</span>
                  <span className="w-1/5 text-center">$100</span>
                </div>
              );
            })}
          </div>
        </main>
        <aside></aside>
      </div>
    </>
  );
};

export default Cart;
