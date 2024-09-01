import React, { useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const Products = () => {
  const { addProductToCart, addProductToWish } = useContext(CartContext);

  // Define the function to fetch products
  const fetchProducts = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return response.data; // Adjust based on actual response structure
  };

  // Use useQuery with the new object signature
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Handle loading state
  if (isLoading) {
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

  // Handle error state
  if (error) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-red-500">
        <p className="text-white">An error occurred: {error.message}</p>
      </div>
    );
  }

  // Check if data is available
  if (!data || !data.data) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-gray-500">
        <p className="text-white">No products available.</p>
      </div>
    );
  }

  // Render products once data is fetched
  const products = data.data;

  // add this product to cart
  async function addProductCart(id) {
    const response = await addProductToCart(id);
    console.log(response);

    if (response) {
      toast.success(response.message);
    } else {
      toast.error("Error");
    }
  }

  // add this product to wishList
  async function addProductWish(id) {
    const response = await addProductToWish(id);
    console.log(response);

    if (response) {
      toast.success(response.message);
    } else {
      toast.error("Error");
    }
  }

  return (
    <section className="py-8">
      <div className="flex flex-wrap justify-between items-center">
        {products.map((product) => (
          <div key={product._id} className="p-3 w-full sm:w-1/2 md:w-1/4">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/productDetails/${product.id}`}>
                <img
                  className="p-8 rounded-t-lg"
                  src={product.imageCover}
                  alt={`${product.title} image`} // Improved alt text
                />
              </Link>

              <div className="px-5 pb-5">
                <Link to={`/productDetails/${product.id}`}>
                  <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-green-400">
                    {product.category.name}
                  </h5>
                </Link>

                <Link to={`/productDetails/${product.id}`}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title.length > 20
                      ? `${product.title.slice(0, 20)}...`
                      : product.title}
                  </h5>
                </Link>

                <div className="flex justify-between items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">
                      {product.ratingsAverage}
                    </span>
                  </div>

                  <div>
                    <i
                      className="fa-solid fa-heart dark:text-white"
                      onClick={() => addProductWish(product.id)}
                    ></i>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.price} $
                  </span>
                  <button
                    type="button"
                    onClick={() => addProductCart(product.id)}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
