import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

const AllOrders = () => {
  const [louder, setLouder] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  // Convert token to data and get id
  const { id } = jwtDecode(localStorage.getItem("tkn"));

  // Call API to get data for all orders
  async function getAllOrder() {
    setLouder(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data);

      setAllOrders(data);
      setLouder(false);
    } catch (error) {
      console.log(error);
      setLouder(false);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);

  // Handle loading state
  if (louder) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-500">
        <InfinitySpin
          visible={true}
          width="200"
          color="#fff"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <>
      <section className="pt-8 dark:bg-[#111827] dark:text-white">
        <div className="w-full md:w-[805] mx-auto">
          {allOrders.length > 0 ? (
            allOrders.map((order, idx) => (
              <div key={idx}>
                <div className="p-5 mb-3 bg-slate-300 dark:bg-sky-950 capitalize">
                  <h2>
                    Address:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.shippingAddress.city}
                    </span>
                  </h2>
                  <h2>
                    Date:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.createdAt}
                    </span>
                  </h2>
                  <h2>
                    Number of items:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.cartItems.length}
                    </span>
                  </h2>
                  <h2>
                    Shipping Price:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.shippingPrice} EGP
                    </span>
                  </h2>
                  <h2>
                    Tax Price:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.taxPrice} EGP
                    </span>
                  </h2>
                  <h2>
                    Total Order Price:{" "}
                    <span className="dark:text-green-500 text-green-800">
                      {order.totalOrderPrice} EGP
                    </span>
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 bg-slate-300 dark:bg-sky-950 text-center">
              <h2 className="dark:text-green-500 text-green-800">
                No orders available.
              </h2>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllOrders;
