import React from "react";
import Slider from "react-slick";
import { InfinitySpin } from 'react-loader-spinner';
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

function ProductImage() {
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
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={product.images[1]} />
        </div>
        <div>
          <img src={product.images[0]}  />
        </div>
      </Slider>
    </div>
  );
}

export default ProductImage;
