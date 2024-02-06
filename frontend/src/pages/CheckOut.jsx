import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Country, State, City } from "country-state-city";
import { useAuth0 } from "@auth0/auth0-react";
import DeliveryForm from "../components/DeliveryForm";
import axios from "axios";
import { useSelector } from "react-redux";

const CheckOut = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const { user } = useAuth0();
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getAddressUrl = `${backendUrl}/get-address`;
  const fetchlocations = async () => {
    if (user?.email !== null && user?.email !== undefined) {
      const location = await axios.post(getAddressUrl, {
        idEmail: user?.email,
      });
      console.log(location.data);
    }
  };
  useEffect(() => {
    fetchlocations();
  }, [user]);

  return (
    <div className="">
      <Nav />
      <div className="flex gap-2 items-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 mx-10 rounded-md">
        <Link to={"/cart"} title="Go back">
          <FaArrowLeftLong />
        </Link>
        <span className="text-xl font-semibold">Checkout</span>
      </div>
      <DeliveryForm />
    </div>
  );
};

export default CheckOut;
