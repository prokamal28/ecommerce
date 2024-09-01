import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  // Get data from context
  const {
    productsCart,
    totalPriceCart,
    updateCount,
    deleteProductfromCart,
    deleteAllProductfromCart,
  } = useContext(CartContext);

  const cartListItems = Array.isArray(productsCart) ? productsCart : [];

  return (
    <>
      <section className="py-8 dark:bg-[#111827] dark:text-white">
        <div className="w-[80%] mx-auto bg-slate-300 dark:text-white dark:bg-slate-900 p-5 capitalize">
          <h1 className="text-4xl font-semibold py-5">Shop Cart</h1>
          {cartListItems.length === 0 ? (
            ""
          ) : (
            <>
              <h2 className="text-green-500 text-2xl font-mono">
                Total Price:{totalPriceCart}EGP
              </h2>
              <button
                type="button"
                className="capitalize my-5 mr-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={deleteAllProductfromCart}
              >
                Remove All
              </button>

              <Link to='/payment' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="capitalize relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  payment
                </span>
              </Link>
            </>
          )}

          {cartListItems.length === 0 ? (
            <p className="text-green-500 text-2xl font-mono text-center">
              Your cart is empty.
            </p>
          ) : (
            productsCart.map((item) => (
              <>
                <div
                  key={item.product._id}
                  className="flex flex-wrap justify-center items-center border-b-2 border-green-600 py-4"
                >
                  <div className="md:w-1/6 p-5">
                    <figure>
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full"
                      />
                    </figure>
                  </div>

                  <div className="md:w-4/6 p-5 text-center md:text-start">
                    <h2 className="mb-3 text-xl">{item.product.title}</h2>
                    <h2 className="mb-3 text-xl">{item.price} EGP</h2>
                    <button
                      type="button"
                      className="capitalize mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => deleteProductfromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="md:w-1/6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          updateCount(item.product.id, item.count - 1)
                        }
                        type="button"
                        className="text-xl text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        -
                      </button>
                      <h2 className="mx-3 text-2xl p-3">{item.count}</h2>
                      <button
                        onClick={() =>
                          updateCount(item.product.id, item.count + 1)
                        }
                        type="button"
                        className="text-xl text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
