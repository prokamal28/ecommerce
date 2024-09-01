import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

const Payment = () => {
  // state for object user info in cash payment
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // to zeros cart
  const { cartId, setNumOfItemCart, setProductsCart, setTotalPriceCart } =
    useContext(CartContext);

  // cash payment
  async function cashPay() {
    const userInfo = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    // call API
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        userInfo,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      toast.success(data.status);
      setNumOfItemCart(0);
      setProductsCart([]);
      setTotalPriceCart(0);
    } catch (error) {
      toast.error("error cash payment");
    }
  }

  // Get the url (protocol + domain)
  const origin = window.location.origin;

  // online payment
  async function onlinePay() {
    const userInfo = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    // call API
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${origin}`,
        userInfo,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      toast.success(data.status);

      // go to pay
      window.open(data.session.url);
    } catch (error) {
      toast.error("error cash payment");
    }
  }

  return (
    <>
      <section className="pt-8 dark:bg-[#111827] dark:text-white">
        <h1 className="text-center text-3xl font-semibold text-green-600 capitalize">
          {" "}
          payment
        </h1>

        <div className="w-full md:w-[80%] mx-auto p-5">
          {/* address */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address:
            </label>
          </div>

          {/* phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="Phone"
              id="Phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label
              htmlFor="Phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone:
            </label>
          </div>

          {/* details */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details:
            </label>
          </div>

          {/* cash payment */}
          <button
            type="button"
            onClick={cashPay}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              cash payment
            </span>
          </button>

          {/* online payment */}
          <button
            type="button"
            onClick={onlinePay}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              online payment
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Payment;
