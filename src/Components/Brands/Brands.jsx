import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function to fetch brands
const fetchBrands = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return response.data; // Adjust based on actual response structure
};

const Brands = () => {
  // Use useQuery to fetch brands
  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"], // Adjust the query key
    queryFn: fetchBrands,
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
        <p className="text-white">No brands available.</p>
      </div>
    );
  }

  // Render brands once data is fetched
  const brands = data.data; // Adjust based on actual API response structure

  return (
    <section className="py-8 dark:bg-[#111827] dark:text-white">
      <div className="flex flex-wrap justify-between items-center">
        {brands.map((brand) => (
          <div key={brand._id} className="p-3 w-full sm:w-1/2 md:w-1/4">
            <Link
              to={`/brands/${brand._id}`}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-slate-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <img
                src={brand.image}
                alt={`Brand: ${brand.name}`}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <p className="font-normal text-center pt-3 text-gray-700 dark:text-gray-400">
                {brand.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
