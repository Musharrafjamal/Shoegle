import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DashboardNav from "../../components/DashboardNav";

const AllOrder = () => {
  const backendUrl = useSelector((state) => state.backendUrlSlice);
  const [fetchedOrder, setFetchedOrder] = useState([]);
  const fetchData = async () => {
    console.log(`${backendUrl}/get-all-order`);
    const response = await axios.get(`${backendUrl}/get-all-order`);
    setFetchedOrder(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(fetchedOrder);
  }, [fetchedOrder]);
  return (
    <div className="flex ">
      <DashboardNav />
      <div className="w-full">
        <div className="flex bg-stone-200 text-stone-800 items-center px-10 justify-between gap-4 py-4">
          <div className="font-medium text-2xl whitespace-nowrap">
            All Orders
          </div>
          <div className="h-[1px] bg-stone-400 w-full"></div>
          <div className="font-medium text-2xl whitespace-nowrap">0 Orders</div>
        </div>
        <main>
          <div className="flex justify-evenly">
            <div className="w-1/6 text-center">Order by</div>
            <div className="w-1/6 text-center">Order Id</div>
            <div className="w-1/6 text-center">Email</div>
            <div className="w-1/6 text-center">Items</div>
            <div className="w-1/6 text-center">Location</div>
            <div className="w-1/6 text-center">Payment method</div>
          </div>
          <div className="flex flex-col">
            {fetchedOrder.map((order, index) => {
              return (
                <div key={order._id} className="flex py-4 border border-b-violet-400">
                  <div className="w-1/6 grid place-items-center">
                    <img
                      src={order.orderByPicture}
                      alt={order.orderByEmail}
                      className="h-8 w-8 object-cover rounded-3xl"
                    />
                  </div>
                  <div className="w-1/6 text-ellipsis overflow-hidden text-center">
                    {order._id}
                  </div>
                  <div className="w-1/6 text-ellipsis overflow-hidden text-center">
                    {order.orderByEmail}
                  </div>
                  <div className="w-1/6 text-ellipsis overflow-hidden text-center">
                    {order.items.length}
                  </div>
                  <div className="w-1/6 text-ellipsis overflow-hidden text-center">
                    {order.location}
                  </div>
                  <div className="w-1/6 text-ellipsis overflow-hidden text-center">
                    {order.paymentOption}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllOrder;
