import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductImage from "../ProductImage/ProductImage";
import { toast } from "react-hot-toast";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams(); // Ensure this matches the ID structure in your API

  // return value from cart context here
  const { addProductToCart } = useContext(CartContext);
  const [loader, setLoader] = useState(false);

  // Fetch product data
  async function getProduct() {
    setLoader(true);
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setLoader(false);
    return response.data;
  }

  // add this product to cart
  async function addProduct() {
    setLoader(true);
    const response = await addProductToCart(id);
    console.log(response);

    if (response) {
      setLoader(false);
      toast.success(response.message);
    } else {
      setLoader(false);
      toast.error("Error");
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [`product${id}`],
    queryFn: getProduct,
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

  const product = data.data;

  return (
    <>
      <section className="pt-8 dark:bg-[#111827] dark:text-white">
        <div className="w-full md:w-[80%] mx-auto">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/3 p-10">
              <figure>
                <ProductImage image={product.imageCover} alt={product.title} />
              </figure>
            </div>

            <div className="w-full md:w-2/3 p-5">
              <div>
                <h2 className="capitalize text-2xl mb-3 font-semibold">
                  {product.brand.name}
                </h2>
                <p className="capitalize text-xl mb-3">{product.description}</p>
                <h3 className="capitalize text-xl font-mono text-green-400 mb-3">
                  {product.category.name}
                </h3>

                <div className="flex justify-between items-center">
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
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.price} $
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addProduct}
                  className="my-10 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  {loader ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    `Add to cart`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductGallery />
    </>
  );
};

export default ProductDetails;
