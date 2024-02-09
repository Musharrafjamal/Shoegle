import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaPersonHiking } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";

const ConfirmOrder = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const [productArray, setProductArray] = useState([]);
  const fetchData = async () => {
    const fetchDataUrl = `${backendUrl}/get-cart-item`;

    const response = await axios.post(fetchDataUrl, {
      id: localIdArray,
    });
    const responseData = response.data;
    const newArray = responseData.map((item, index) => ({
      ...item,
      quantity: localIdArray[index].quantity,
    }));
    setProductArray(newArray);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // console.log(productArray);
  }, [productArray]);

  return (
    <div className="md:mx-10 mb-8 p-4 rounded-md border border-grey-300 shadow-gray-300 shadow-md flex flex-col gap-4">
      <h2 className="text-center md:text-left text-xl font-bold text-stone-500">
        Confirm order
      </h2>
      <div className="bg-gray-200 rounded flex flex-col gap-4 items-center w-full p-6">
        <div className="w-full flex flex-col gap-3">
          {productArray.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 aspect-square object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-blue-700">
                      {product.name}
                    </h4>
                    <p className="text-stone-700">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-stone-500 font-semibold text-lg">
                  ₹{product.price}
                </div>
              </div>
            );
          })}
        </div>
        <span className="w-full h-[1px] bg-stone-400"></span>
        <div className="w-full flex flex-col gap-4 text-stone-500 font-semibold text-xl">
          <div className="flex justify-between">
            <span>Total</span>
            <span>
              ₹
              {productArray.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Delivery charges</span>
            <span>₹120</span>
          </div>
          <div className="flex justify-between text-blue-700">
            <span>Final price</span>
            <span>
              ₹
              {productArray.reduce(
                (acc, curr) => acc + curr.price * curr.quantity + 120,
                0
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-green-700 text-center md:text-left">Payment options</h2>
        <div className="radio-input justify-end md:justify-start">
          <div>
              <input value="online" name="value-radio" id="online" type="radio" />
              <label htmlFor="online" className="flex gap-1 items-center">Pay online <LuBadgeCheck /></label>
          </div>
          <div>
              <input value="cod" name="value-radio" id="cod" type="radio" />
              <label htmlFor="cod">Cash on delivery <FaPersonHiking /></label>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="flex items-center justify-center font-semibold gap-2 px-4 py-3 text-sm rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 hover:-translate-y-1">
          <span>Confirm order</span> <IoShieldCheckmark />
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
