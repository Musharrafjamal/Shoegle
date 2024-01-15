import React, { useState } from "react";
import Nav from "../components/Nav";
import { FaCartShopping } from "react-icons/fa6";

import img1 from "../assets/stock-images/1.webp";
import img2 from "../assets/stock-images/2.webp";
import img3 from "../assets/stock-images/3.webp";
import img4 from "../assets/stock-images/4.webp";
import img5 from "../assets/stock-images/5.webp";
import img6 from "../assets/stock-images/6.webp";

import { increment, decrement } from "../redux/itemCounterSlice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const itemCounter = useSelector(state => state.counter)
  const dispatch = useDispatch()
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
              {itemCounter} Items
            </span>
          </div>
          <span className="w-10 h-12 bg-black"></span>
          <div className="flex flex-col gap-6 pt-8">
            <div className="flex px-10 justify-between text-stone-700">
              <span className="w-2/5">Product List</span>
              <span className="w-1/5 text-center">Quantity</span>
              <span className="w-1/5 text-center">Price</span>
              <span className="w-1/5 text-center">Total</span>
            </div>
            <div className="flex px-10 justify-between text-stone-700">
              <span className="flex gap-2 w-2/5">
                <img
                  src={img1}
                  alt=""
                  className="w-20 h-20 object-cover rounded"
                />
                <span>
                  <div className="text-lg font-semibold">Green sneaker</div>
                  <div className="text-red-500 cursor-pointer">Remove</div>
                </span>
              </span>
              <span className="w-1/5 flex h-full gap-2 items-center justify-center">
                <button
                className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                  onClick={() => {
                    if (itemCounter > 1) {
                      dispatch(decrement())
                    }
                  }}
                >
                  -
                </button>
                <span>{itemCounter}</span>
                <button
                className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                  onClick={() => {
                    dispatch(increment())
                  }}
                >
                  +
                </button>
              </span>
              <span className="w-1/5 text-center">$50</span>
              <span className="w-1/5 text-center">$100</span>
            </div>
          </div>
        </main>
        <aside></aside>
      </div>
    </>
  );
};

export default Cart;
