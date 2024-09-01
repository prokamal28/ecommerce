import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Function to fetch categories
const fetchCategories = async () => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  return response.data; // Adjust based on actual response structure
};

export default function CategoriesSlider() {
  // Use useQuery with object syntax
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoriesSlider"], // Unique key for the query
    queryFn: fetchCategories, // Function to fetch data
  });

  // Handle loading state
  if (isLoading) {
    return (
      <section className="p-5">
        <p>Loading...</p>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className="p-5">
        <p>Error: {error.message}</p>
      </section>
    );
  }

  // Check if data is available
  const categories = data?.data || []; // Adjust based on actual API response structure

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay:true
  };

  return (
    <section className="px-10 py-5">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="p-3">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-center mt-2 text-sm font-semibold">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </section>
  );
}
