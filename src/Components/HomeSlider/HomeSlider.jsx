import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/slider-image-1.jpeg";
import slider2 from "./../../assets/images/slider-image-2.jpeg";
import slider3 from "./../../assets/images/slider-image-3.jpeg";
import slider4 from "./../../assets/images/banner-4.jpeg";
import slider5 from "./../../assets/images/blog-img-1.jpeg";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: false,
  };
  return (
    <section className="p-5">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-2/3">
          <Slider {...settings}>
            <div>
              <img src={slider1} alt="" className="w-full h-[400px]" />
            </div>

            <div>
              <img src={slider2} alt="" className="w-full h-[400px]" />
            </div>

            <div>
              <img src={slider3} alt="" className="w-full h-[400px]" />
            </div>
          </Slider>
        </div>

        <div className="w-1/3">
          <div>
            <img src={slider4} alt="" className="w-full h-[200px]" />
          </div>
          <div>
            <img src={slider5} alt="" className="w-full h-[200px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
