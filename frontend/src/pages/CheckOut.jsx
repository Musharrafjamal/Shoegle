import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import DeliveryForm from "../components/DeliveryForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import Footer from "../components/Footer";

const CheckOut = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const [locations, setLocations] = useState([]);
  const { user, loginWithRedirect } = useAuth0();
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const getAddressUrl = `${backendUrl}/get-address`;
  const deleteAddressUrl = `${backendUrl}/delete-address`;
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
    console.log(locations);
  }, [locations]);

  const handleDeleteAddress = async (id) => {
    const deleteAddress = await axios.post(deleteAddressUrl, {
      id,
      idEmail: user?.email,
    });
    console.log(deleteAddress.data);
    setLocations((prev) =>
      prev.filter((data) => {
        return data._id !== id;
      })
    );
  };
  return (
    <div className="relative">
      <Nav />
      <div className="mt-4 mb-8">
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
          <div>
            <div className="flex gap-2 items-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 md:mx-10 md:rounded-md">
              <Link to={"/cart"} title="Go back">
                <FaArrowLeftLong />
              </Link>
              <span className="text-xl font-semibold">Checkout</span>
            </div>
            <div className="bg-amber-100 md:mx-10 p-6 mt-6 rounded-lg flex flex-col gap-6">
              <div className="text-xl font-semibold text-center text-stone-700 flex gap-4 flex-col md:flex-row justify-between items-center">
                <span>Delivery information</span>
                <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-end">
                  <span className="text-xs text-stone-700 flex items-center gap-1">
                    Click this button to add a new address that you can’t see up
                    there.
                    <FaArrowRightLong className="text-lg rotate-[90deg] md:text-sm md:rotate-0" />
                  </span>
                  <button
                    onClick={() => setOpenDailog(true)}
                    className="flex items-center justify-center font-semibold gap-2 px-4 py-3 text-sm rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 hover:-translate-y-1"
                  >
                    <span>Add a new address</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {locations.length === 0 && (
                  <div className="py-24 text-center text-sm text-stone-700 flex gap-1 flex-col sm:flex-row justify-center">
                    <span className="whitespace-nowrap">No Address found, to create a new address</span>
                    <button
                      onClick={() => setOpenDailog(true)}
                      className="underline font-medium whitespace-nowrap"
                    >
                      click here!
                    </button>
                  </div>
                )}
                {locations.map((loc, index) => {
                  return (
                    <div
                      key={index}
                      className=" bg-white border-stone-300 shadow-md p-4 rounded-md text-sm text-stone-700 font-medium "
                    >
                      <button
                        onClick={() => handleDeleteAddress(loc._id)}
                        className="float-right"
                      >
                        <RxCross1 />
                      </button>
                      <label className="flex gap-4">
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`absolute top-0 right-0 w-full ${
          locations.length >= 3 && "h-full"
        } md:h-full py-8 flex items-center bg-black bg-opacity-50 transition-all duration-500 ${
          openDailog ? "delay-0" : "delay-500"
        }`}
        style={{
          opacity: openDailog ? "1" : "0",
          visibility: openDailog ? "visible" : "hidden",
        }}
      >
        <div
          className={`w-full overflow-hiddem flex flex-col items-center transition-all duration-500  ease-in-out origin-center ${
            openDailog ? "scale-100" : "scale-0"
          }`}
        >
          <div className="w-5/6">
            <DeliveryForm
              setOpenDailog={setOpenDailog}
              setLocations={setLocations}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
