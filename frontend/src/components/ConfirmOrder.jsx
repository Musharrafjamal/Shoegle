import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaPersonHiking } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import { useAuth0 } from "@auth0/auth0-react";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderId } from "../redux/orderIdSlice";
import { updateArray } from "../redux/arrayOfId";

const ConfirmOrder = ({ choosedLocation }) => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const [productArray, setProductArray] = useState([]);
  const [deliveryError, setDeliveryError] = useState(true);
  const [PaymentError, setPaymentError] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);
  const { user } = useAuth0();
  const dispatch = useDispatch();

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
  const [paymentOption, setPaymentOption] = useState("");
  useEffect(() => {
    if (choosedLocation !== "") {
      setDeliveryError(false);
    }
    if (paymentOption !== "") {
      setPaymentError(false);
    }
    if (PaymentError === false && deliveryError === false) {
      setDisableBtn(false);
    }
  }, [choosedLocation, paymentOption, PaymentError, deliveryError]);

  const navigate = useNavigate();
  const handleConfirmOrder = async () => {
    const generateOrderId = v4();
    const orderUrl = `${backendUrl}/post-order`;
    const order = await axios.post(orderUrl, {
      location: choosedLocation,
      items: productArray,
      paymentOption,
      orderByEmail: user.email,
      orderByPicture: user.picture,
      orderId: generateOrderId,
    });
    dispatch(updateOrderId(generateOrderId));
    console.log(order.data);
    navigate("/order-placed");
    const newArrayOfId = [];
    dispatch(updateArray(newArrayOfId))
    localStorage.setItem("idArray", JSON.stringify(newArrayOfId));
  };

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
        <h2 className="text-2xl font-semibold text-green-700 text-center sm:text-left">
          Payment options
        </h2>
        <div className="radio-input justify-center sm:justify-start">
          <div>
            <input
              value="online payment"
              name="value-radio"
              id="online"
              type="radio"
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            <label htmlFor="online" className="flex gap-1 items-center">
              Pay online <LuBadgeCheck />
            </label>
          </div>
          <div>
            <input
              value="cash on delivery"
              name="value-radio"
              id="cod"
              type="radio"
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            <label htmlFor="cod">
              Cash on delivery <FaPersonHiking />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 flex-col sm:flex-row">
        <div className="flex flex-col justify-between items-center text-xs text-white sm:flex-row gap-2">
          <span
            className={`bg-red-500 rounded flex items-center gap-1 p-2 animate-pulse transition-transform duration-700 ease-in-out ${
              PaymentError ? "scale-100" : "scale-0"
            }`}
          >
            <MdError size={15} />
            Please choose a payment option!
          </span>
          <span
            className={`bg-red-500 rounded flex items-center gap-1 p-2 animate-pulse transition-all duration-700 ease-in-out ${
              deliveryError ? "scale-100" : "scale-0"
            }`}
          >
            <MdError size={15} />
            Please choose a delivery address!
          </span>
        </div>
        <button
          onClick={disableBtn === false ? handleConfirmOrder : () => {}}
          className={`flex items-center justify-center font-semibold gap-2 px-4 py-3  text-sm rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 hover:-translate-y-1 ${
            disableBtn && "opacity-75 cursor-not-allowed hover:transform-none"
          }`}
        >
          <span>Confirm order</span> <IoShieldCheckmark />
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
