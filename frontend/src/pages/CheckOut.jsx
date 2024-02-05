import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Country, State, City } from "country-state-city";

const CheckOut = () => {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryIsoCode, setCountryIsoCode] = useState("");
  const [stateIsoCode, setStateIsoCode] = useState("");

  return (
    <div className="">
      <Nav />
      <div className="flex gap-2 items-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 mx-10 rounded-md">
        <Link to={"/cart"} title="Go back">
          <FaArrowLeftLong />
        </Link>
        <span className="text-xl font-semibold">Checkout</span>
      </div>

      <div className="mx-10 p-8 bg-stone-200 rounded-md my-8">
        <div className="flex flex-col gap-2 mb-4 ">
          <span className="text-xl font-semibold">Delivery Information</span>
          <span className="h-[1px] w-full bg-stone-400"></span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2 w-full ">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-zinc-800 ">
              Full name
            </label>
            <input
              type="text"
              id="name"
              className="pl-2  h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
              placeholder="Type here..."
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-zinc-800 ">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="pl-2  h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
              placeholder="Type here..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="font-semibold text-gray-800">
              Country
            </label>
            <select
              id="country"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              defaultValue="default"
              onChange={(e) => {
                const countryString = e.target.value;
                const countryArr = countryString.split(",");
                const countryCode = countryArr[0];
                const countryname = countryArr[1];
                setCountryIsoCode(countryCode);
                setCountryName(countryname);
              }}
            >
              <option value="default" disabled>
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
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              defaultValue="default"
              onChange={(e) => {
                const stateString = e.target.value;
                const stateArr = stateString.split(",");
                const stateCode = stateArr[0];
                const stateName = stateArr[1];
                setStateIsoCode(stateCode);
                setStateName(stateName);
              }}
            >
              <option value="default" disabled>
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
              defaultValue="default"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="default" disabled>
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
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pincode" className="font-semibold text-zinc-800 ">
              Pin code
            </label>
            <input
              type="text"
              id="pincode"
              className="pl-2 h-10 text-lg font-semibold text-stone-600 tracking-wide rounded focus:outline-none transition-all duration-500 focus:scale-105 focus:border focus:border-stone-300"
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
