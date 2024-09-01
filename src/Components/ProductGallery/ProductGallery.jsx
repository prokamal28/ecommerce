import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import React, { Component } from "react";
import Slider from "react-slick";

export default function ProductGallery() {
  const { id } = useParams();
  //   call API
  async function getProduct() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return response.data;
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



  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 1000,
    autoplay:true,
    autoplaySpeed: 1000,

  };


  return (
    <section className="p-10 dark:bg-[#111827] dark:text-white">
      <div className="slider-container">
        <Slider {...settings}>
        <div className="p-2">
          <img src={product.images[0]} alt="" className="w-full" />
        </div>
        <div className="p-2">
          <img src={product.images[1]} alt="" className="w-full" />
        </div>
        <div className="p-2">
          <img src={product.images[2]} alt="" className="w-full" />
        </div>
        <div className="p-2">
          <img src={product.images[3]} alt="" className="w-full" />
        </div>
        </Slider>
      </div>
    </section>
  );
}
