import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Country, State, City } from "country-state-city";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const DeliveryForm = ({ setOpenDailog, setLocations }) => {
  const [countryName, setCountryName] = useState("");
  const [countryString, setCountryString] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateString, setStateString] = useState("");
  const [cityName, setCityName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState();
  const [countryIsoCode, setCountryIsoCode] = useState("");
  const [stateIsoCode, setStateIsoCode] = useState("");
  const [errors, setErrors] = useState({});

  const { user } = useAuth0();
  const backendUrl = useSelector((state) => state.backendUrlSlice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countryName !== "" && stateName !== "") {
      
      const data = {
        idEmail: user?.email,
        customerName,
        phoneNumber,
        email,
        country: countryName,
        state: stateName,
        city: cityName,
        pincode,
        address,
      };
      const url = `${backendUrl}/add-delivery-address`;
      const response = await axios.post(url, data);
      setLocations(response.data.locations)
      setOpenDailog(false);
      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setPincode("");
      setCountryString("");
      setStateString("");
      setCityName("");
    } 
  };

  return (
    <div className="p-8 bg-stone-200 rounded-md">
      <div className="flex flex-col gap-2 mb-4 ">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Delivery Information</span>
          <button onClick={() => setOpenDailog(false)}>
            <RxCross1 size={25} />
          </button>
        </div>
        <span className="h-[1px] w-full bg-stone-400"></span>
      </div>
      <form
        className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="customerName"
            className="font-semibold text-zinc-800 "
          >
            Full name
          </label>
          <input
            type="text"
            id="customerName"
            className="pl-2  h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
            placeholder="Type here..."
            onChange={(e) => setCustomerName(e.target.value)}
            required
            value={customerName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-semibold text-zinc-800 ">
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            className="pl-2  h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
            placeholder="Type here..."
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            value={phoneNumber}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-zinc-800 ">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="pl-2  h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
            placeholder="Type here..."
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="font-semibold text-gray-800">
            Country
          </label>
          <select
            id="country"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-stone-600 font-medium tracking-wide"
            onChange={(e) => {
              const countryValue = e.target.value;
              setCountryString(countryValue)
              const countryArr = countryValue.split(",");
              const countryCode = countryArr[0];
              const countryname = countryArr[1];
              setCountryIsoCode(countryCode);
              setCountryName(countryname);
            }}
            required
            value={countryString}
          >
            <option value=""  >
              Select a country
            </option>
            {Country.getAllCountries().map((data, index) => {
              return (
                <option value={[data.isoCode, data.name]} key={index}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="font-semibold text-gray-800">
            State
          </label>
          <select
            id="state"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-stone-600 font-medium tracking-wide"
            onChange={(e) => {
              const stateValue = e.target.value;
              setStateString(stateValue)
              const stateArr = stateValue.split(",");
              const stateCode = stateArr[0];
              const stateName = stateArr[1];
              setStateIsoCode(stateCode);
              setStateName(stateName);
            }}
            required
            value={stateString}
          >
            <option value="" >
              Select a state
            </option>
            {State.getStatesOfCountry(countryIsoCode).map((data, index) => {
              return (
                <option value={[data.isoCode, data.name]} key={index}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="font-semibold text-gray-800">
            City
          </label>
          <select
            id="city"
            onChange={(e) => setCityName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 text-stone-600 font-medium tracking-wide"
            value={cityName}
          >
            <option value="" >
              Select a city
            </option>
            {City.getCitiesOfState(countryIsoCode, stateIsoCode).map(
              (data, index) => {
                return (
                  <option value={data.name} key={index}>
                    {data.name}
                  </option>
                );
              }
            )}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-semibold text-zinc-800 ">
            Address
          </label>
          <textarea
            id="address"
            rows="5"
            className="pl-2 resize-none text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
            placeholder="Type here..."
            onChange={(e) => setAddress(e.target.value)}
            required
            value={address}
          ></textarea>
        </div>
        <div className="flex flex-col gap-4 justify-between md:gap-0 md:py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="pincode" className="font-semibold text-zinc-800 ">
              Pin code
            </label>
            <input
              type="text"
              id="pincode"
              className="pl-2 h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
              placeholder="Type here..."
              onChange={(e) => setPincode(e.target.value)}
              required
              value={pincode}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setOpenDailog(false)}
              className="font-semibold w-full py-3 rounded bg-red-500 transition-all duration-500 shadow-lg shadow-stone-400 hover:shadow-none text-white"
            >
              <span>Discard</span>
            </button>
            <button className="flex items-center justify-center font-semibold gap-2 w-full py-3 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white transition-all duration-500 shadow-lg shadow-stone-400 hover:shadow-none ">
              <span>Add Info</span> <FaArrowRightLong />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
