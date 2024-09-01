import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  return response.data; // Adjust based on actual response structure
};

const Categories = () => {
  // Use useQuery to fetch categories
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"], // Adjust the query key
    queryFn: fetchCategories,
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
        <p className="text-white">No categories available.</p>
      </div>
    );
  }

  // Render categories once data is fetched
  const categories = data.data; // Adjust based on actual API response structure

  return (
    <section className="py-8 dark:bg-[#111827] dark:text-white">
      <div className="flex flex-wrap justify-between items-center">
        {categories.map((category) => (
          <div key={category._id} className="p-3 w-full md:w-1/3">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/categories/${category._id}`}>
                <img
                  className="rounded-t-lg w-full"
                  src={category.image}
                  alt={category.name}
                />
              </Link>
              <div className="p-5">
                <Link to={`/categories/${category._id}`}>
                  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-green-500 dark:text-green-400">
                    {category.name}
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
