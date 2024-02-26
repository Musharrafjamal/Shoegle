import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const DashboardNav = () => {
  const { logout } = useAuth0();
  return (
    <div className="w-1/6 min-h-screen h-full shadow-lg shadow-stone-400 py-4">
      <Link to={"/"} className="flex justify-center items-center gap-1">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/shoegle-ce904.appspot.com/o/running.png?alt=media&token=6481f9f5-4e92-4db6-9cbc-9d71d2fc5fb3"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold text-stone-700">Shoegle</span>
      </Link>
      <div className="w-full flex flex-col gap-4 items-center mt-12">
        <button className="font-medium text-white shadow shadow-stone-300 border border-stone-300 rounded-md w-9/12 mx-4 py-3 bg-blue-500 transition-all duration-500 hover:-rotate-3 hover:scale-105">
          Dashboard
        </button>
        <Link
          to={"/add-product"}
          className="font-medium text-center text-white shadow shadow-stone-300 border border-stone-300 rounded-md w-9/12 mx-4 py-3 bg-blue-500 transition-all duration-500 hover:-rotate-3 hover:scale-105"
        >
          Add product
        </Link> 
        <Link to={"/all-orders"} className="text-center font-medium text-white shadow shadow-stone-300 border border-stone-300 rounded-md w-9/12 mx-4 py-3 bg-blue-500 transition-all duration-500 hover:-rotate-3 hover:scale-105">
          All Orders
        </Link>
        <button
          onClick={() => {
            logout()
          }}
          className="font-medium text-white shadow shadow-stone-300 border border-stone-300 rounded-md w-9/12 mx-4 py-3 bg-rose-500 transition-all duration-500 hover:-rotate-3 hover:scale-105"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
