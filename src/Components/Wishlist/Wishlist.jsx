import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  // Get data from context
  const { productsWish, deleteProductfromWish } = useContext(CartContext);

  // Ensure productsWish is an array
  const wishListItems = Array.isArray(productsWish) ? productsWish : [];
  console.log(wishListItems); // Optional: Use this to verify the structure of the items

  return (
    <section className="py-8 dark:bg-[#111827] dark:text-white">
      <div className="w-[80%] mx-auto bg-slate-300 dark:text-white dark:bg-slate-900 p-5 capitalize">
        <h1 className="text-4xl font-semibold py-5">My Wish List</h1>
        {wishListItems.length === 0 ? (
            ""
          ) : (
            <h2 className="text-green-500 text-2xl font-mono">
              Total wishes:{wishListItems.length}
            </h2>
          )}


        {wishListItems.length === 0 ? (
          <p className="text-green-500 text-2xl font-mono text-center">Your wishlist is empty.</p>
        ) : (
          wishListItems.map((item) => (
            <div
              key={item._id} // Ensure this is unique and defined
              className="flex flex-wrap justify-center items-center border-b-2 border-green-600 py-4"
            >
              <div className="md:w-1/6 p-5">
                <figure>
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full"
                  />
                </figure>
              </div>

              <div className="md:w-4/6 md:text-start text-center p-5">
                <h2 className="mb-3 text-xl">{item.title}</h2>
                <h2 className="mb-3 text-xl">{item.price} EGP</h2>
              </div>

              <div className="md:w-1/6 p-5">
                <button
                  type="button"
                  className="capitalize text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => deleteProductfromWish(item._id)} // Use item._id consistently
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Wishlist;
