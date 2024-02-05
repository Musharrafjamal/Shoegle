import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";

const Cart = () => {
  const localIdArray = JSON.parse(localStorage.getItem("idArray"));
  const idArray = useSelector((state) => state.arrayOfId.myArray);
  const [arrayOfId, setArrayOfId] = useState((prev) =>
    idArray.length === 0 ? localIdArray : idArray
  );

  const dispatch = useDispatch();
  const backendUrl = useSelector((state) => state.backendUrlSlice);

  const btns = [
    {
      content: "Home",
      destination: "/",
      icon: <TiHome />,
    },
    {
      content: "Collection",
      destination: "/collection",
      icon: <FaCartShopping />,
    },
  ];
  const [fetchItems, setFetchItem] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const getItemUrl = `${backendUrl}/get-cart-item`;
  const webGetItem = "https://shoegle-production.up.railway.app/get-cart-item";

  const fetchItem = async () => {
    try {
      const items = await axios.post(getItemUrl, { id: arrayOfId });
      setFetchItem(items.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    fetchItem();
    localStorage.setItem("idArray", JSON.stringify(arrayOfId));
  }, [arrayOfId]);
  useEffect(() => {
    const mergedArray = fetchItems.map((item) => {
      const mergeItem = arrayOfId.find(
        (mergeItem) => mergeItem.id === item._id
      );

      if (mergeItem) {
        return { ...item, id: mergeItem.id, quantity: mergeItem.quantity };
      } else {
        return item;
      }
    });
    setMergedData(mergedArray);
  }, [fetchItems, arrayOfId]);

  const handleRemoveItem = (id) => {
    const newArrayOfId = arrayOfId.filter((e, i) => e.id !== id);
    setArrayOfId(newArrayOfId);
  };

  const handleIncreasingQuantity = async (oldId, quantity) => {
    setArrayOfId((prevArray) => {
      const updatedQuantity = prevArray.map((item) => {
        if (oldId === item.id) {
          return { ...item, quantity: quantity + 1 };
        }
        return item;
      });
      return updatedQuantity;
    });
  };
  const handledecreasingQuantity = (oldId, quantity) => {
    setArrayOfId((prevArray) => {
      const updatedQuantity = prevArray.map((item) => {
        if (oldId === item.id && quantity > 1) {
          return { ...item, quantity: quantity - 1 };
        }
        return item;
      });
      return updatedQuantity;
    });
  };

  const GetTotalAmount = () => {
    const totalAmount = mergedData.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return totalAmount;
  };

  useEffect(() => {
    const totalAmount = GetTotalAmount();
    setTotalAmount(totalAmount);
  }, [mergedData]);

  return (
    <>
      <Nav alternate={true} btns={btns} />
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <main className="bg-white w-full">
          <div className="w-full flex justify-between items-center px-12 py-4 shadow-lg border-stone-300">
            <span className="text-xl font-semibold text-stone-800">
              Shpping cart
            </span>
            <span className="text-xl font-semibold text-stone-800">
              {mergedData.length} Items
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {mergedData.length === 0 ? (
              <span className="flex flex-col items-center justify-center gap-2 text-stone-700 py-16">
                <FaCartShopping size={50} />
                <span>There is no itme in your cart!</span>
                <div className="flex gap-2 items-center justify-center bg-stone-700 py-3 px-4 text-white rounded hover:scale-110 transition-all duration-300">
                  <Link to={"/collection"}>Continue shopping</Link>
                  <FaArrowLeftLong className=" rotate-180" />
                </div>
              </span>
            ) : (
              mergedData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 m-4 p-4 rounded-md border border-stone-300 shadow-md"
                  >
                    <Link
                      to={`/product/${item._id}`}
                      className="flex flex-col items-center gap-2"
                    >
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-2/3 aspect-square object-cover rounded-lg"
                      />
                      <div className="text-lg font-semibold hover:underline transition-all">
                        {item.name}
                      </div>
                      <div className="font-semibold text-green-700 text-opacity-90">
                        Rate: ₹{item.price}
                      </div>
                    </Link>

                    <span className="flex gap-2 items-center justify-start">
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handledecreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handleIncreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        +
                      </button>
                    </span>
                    <span className="font-semibold text-stone-700 text-opacity-90">
                      Price: ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        handleRemoveItem(item._id);
                      }}
                      className="bg-red-500 text-white py-2 rounded-md w-full cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                );
              })
            )}
            <span className="border-t-2"></span>
            <div className="w-full text-xl font-semibold text-slate-800 flex items-center gap-4 p-4">
              <span>Total</span>
              <span className="bg-slate-300 h-[1px] w-full"></span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          <div className="flex-col gap-6 py-8 hidden md:flex">
            <div className="flex px-10 justify-between text-stone-700">
              <span className="w-[100%]">Product List</span>
              <span className="w-1/5 text-center">Quantity</span>
              <span className="w-1/5 text-center">Rate</span>
              <span className="w-1/5 text-center">Price</span>
            </div>
            {mergedData.length === 0 ? (
              <span className="flex flex-col items-center justify-center gap-2 text-stone-700 py-16">
                <FaCartShopping size={50} />
                <span>There is no itme in your cart!</span>
                <div className="flex gap-2 items-center justify-center bg-stone-700 py-3 px-4 text-white rounded hover:scale-110 transition-all duration-300">
                  <Link to={"/collection"}>Continue shopping</Link>
                  <FaArrowLeftLong className=" rotate-180" />
                </div>
              </span>
            ) : (
              mergedData.map((item, index) => {
                return (
                  <div
                    className="flex px-10 justify-center items-center text-stone-700"
                    key={index}
                  >
                    <span className="flex gap-2 w-full">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-20 h-20 object-cover rounded"
                        />
                      </Link>
                      <span>
                        <Link to={`/product/${item._id}`}>
                          <div className="text-lg font-semibold hover:underline transition-all">
                            {item.name}
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            handleRemoveItem(item._id);
                          }}
                          className="text-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </span>
                    </span>
                    <span
                      className="w-1/5 flex h-full gap-2 items-center justify-center"
                      key={item.id}
                    >
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handledecreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 border-2 border-stone-400 rounded hover:bg-stone-700 hover:border-transparent transition-all duration-200 hover:text-white"
                        onClick={() => {
                          handleIncreasingQuantity(item._id, item.quantity);
                        }}
                      >
                        +
                      </button>
                    </span>
                    <span className="w-1/5 text-center">₹{item.price}</span>
                    <span className="w-1/5 text-center">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                );
              })
            )}
            <span className="border-t-2"></span>
            <div className="text-right w-[93%] text-xl font-semibold text-stone-700">
              Total: ₹{totalAmount}
            </div>
          </div>
          {mergedData.length !== 0 && (
            <div className="flex py-8 px-12 bg-stone-300 justify-between flex-col gap-4 md:flex-row">
              <Link
                to={"/collection"}
                className="flex gap-2 items-center justify-center text-stone-800 hover:scale-110 transition-all duration-300"
              >
                <FaArrowLeftLong />
                <span>Continue shopping</span>
              </Link>
              <Link
                to={"/checkout"}
                className="flex gap-2 items-center justify-center bg-stone-700 py-3 px-4 text-white rounded hover:scale-110 transition-all duration-300"
              >
                <button>Proceed next</button>
                <FaArrowLeftLong className=" rotate-180" />
              </Link>
            </div>
          )}
        </main>
      )}
      <Footer />
    </>
  );
};

export default Cart;
