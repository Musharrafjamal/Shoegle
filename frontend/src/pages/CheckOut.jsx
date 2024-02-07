import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import DeliveryForm from "../components/DeliveryForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const CheckOut = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const [locations, setLocations] = useState([]);
  const { user, loginWithRedirect } = useAuth0();
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getAddressUrl = `${backendUrl}/get-address`;
  const fetchlocations = async () => {
    if (user?.email !== null && user?.email !== undefined) {
      const location = await axios.post(getAddressUrl, {
        idEmail: user?.email,
      });
      setLocations(location.data.locations);
    }
  };
  useEffect(() => {
    fetchlocations();
  }, [user]);
  const [openDailog, setOpenDailog] = useState(false);
  useEffect(() => {
    // console.log(locations);
  }, []);

  return (
    <div>
      <Nav />
      {user === undefined ? (
        <div className="w-full h-64 flex items-end justify-center">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-2xl font-semibold text-stone-700">
              You need to login before checkout!
            </span>
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center justify-center font-semibold gap-2 w-2/5 py-3 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 shadow-lg shadow-stone-400 hover:shadow-none "
            >
              <span>Login</span> <FaArrowRightLong />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="flex gap-2 items-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 md:mx-10 mt-4 md:rounded-md">
            <Link to={"/cart"} title="Go back">
              <FaArrowLeftLong />
            </Link>
            <span className="text-xl font-semibold">Checkout</span>
          </div>
          <div className="bg-amber-100 md:mx-10 p-6 my-6 rounded-lg flex flex-col gap-6">
            <div className="text-xl font-semibold text-center text-stone-700 flex gap-2 justify-center items-center">
              <span>Delivery information</span>
            </div>
            <div className="flex flex-col gap-4">
              {locations.map((loc, index) => {
                return (
                  <label
                    key={index}
                    className="flex gap-4 bg-white text-sm text-stone-700 font-medium border-stone-300 shadow-md p-4 rounded-md"
                  >
                    <input
                      type="radio"
                      value={loc}
                      name="address"
                      onChange={(e) => console.log(loc, index)}
                    />
                    <div className="flex flex-col gap-1">
                      <span>Name: {loc.customerName}</span>
                      <span>Phone Number: {loc.phoneNumber}</span>
                      <span>
                        Address: {loc.address}, {loc.pincode}
                      </span>
                      <span>
                        Location: {loc.city}, {loc.state}, {loc.country}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
              <span className="text-sm text-stone-700 font-medium flex items-center gap-2">
                Click this button to add a new address that you can’t see up
                there.
                <FaArrowRightLong className="text-lg rotate-[135deg] md:text-sm md:rotate-0" />
              </span>
              <button
                onClick={() => setOpenDailog(true)}
                className="flex items-center justify-center font-semibold gap-2 px-4 py-3 text-sm rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 shadow-lg shadow-stone-400 hover:shadow-none "
              >
                <span>Add a new address</span>
              </button>
            </div>
          </div>
          {openDailog && (
            <div className="absolute top-0 right-0 w-full py-8 bg-black bg-opacity-50 ">
              <div
                className="w-full flex flex-col items-center"
              >
                <div className="w-5/6">
                  <DeliveryForm setOpenDailog={setOpenDailog} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckOut;
