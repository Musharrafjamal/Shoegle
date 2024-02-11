import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import check2 from "../assets/animated/check-2.json";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderId } from "../redux/orderIdSlice";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const orderId = useSelector((state) => state.orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderId === "") {
      navigate("/cart");
    } else {
      dispatch(updateOrderId(""));
    }
  }, []);
  const checkRef = useRef(null);
  return (
    <div>
      <div className="flex flex-col flex-wrap justify-center items-center min-h-screen">
        <div className="w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
          <Lottie
            animationData={check2}
            lottieRef={checkRef}
            loop={false}
            onComplete={() => {
              checkRef.current?.goToAndStop(140, true);
            }}
          />
          <div className="absolute bottom-8 w-full">
            <h3 className="text-xl font-semibold text-stone-800 text-center">
              Order Placed
            </h3>
            <p className="text-sm text-stone-700 text-center">
              Your order has been placed successfully.
            </p>
          </div>
        </div>
        <Link
          to={"/"}
          className="flex items-center justify-center font-semibold gap-2 px-4 py-3  text-sm rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 hover:-translate-y-1"
        >
          Continue shopping <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
