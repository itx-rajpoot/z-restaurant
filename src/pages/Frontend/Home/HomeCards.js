import React, { useEffect, useRef, useState } from "react";
import { womens, mens, kids, others } from "../../../component/Assets/card_images";
import Cards from "../../../component/cards";

import Aos from "aos";
import "aos/dist/aos.css";
import { Image, Carousel, Space } from "antd";
import {
  InstagramOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

export default function HomeCards() {
  const sectionStyle = {
    height: "100px",
  };
  const sectionStyle4 = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  const sectionStyle5 = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  useEffect(() => {
    Aos.init();
  }, []);
  
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const womensCarouselRef = useRef(null);
  const mensCarouselRef = useRef(null);

  const handleNext = (carouselRef) => {
    carouselRef.current.next();
  };

  const handlePrev = (carouselRef) => {
    carouselRef.current.prev();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mx-3 mb-4 pt-2">Fast Foods</h3>
        <div className="icons me-5">
          <Space>
            <LeftCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={() => handlePrev(womensCarouselRef)}
            />
            <RightCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={() => handleNext(womensCarouselRef)}
            />
          </Space>
        </div>
      </div>
      <div className="px-3">
        <Carousel {...carouselSettings} ref={womensCarouselRef}>
          {womens.slice(0, 8).map((item, i) => (
            <Cards value={item} key={i} />
          ))}
        </Carousel>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <h3 className="mx-3 mb-4 pt-2">Desserts</h3> 
        <div className="icons me-5">
          <Space>
            <LeftCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={() => handlePrev(mensCarouselRef)}
            />
            <RightCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={() => handleNext(mensCarouselRef)}
            />
          </Space>
        </div>
      </div>
      <div className="px-3">
        <Carousel {...carouselSettings} ref={mensCarouselRef}>
          {mens.slice(0, 8).map((item, i) => (
            <Cards value={item} key={i} />
          ))}
        </Carousel>
      </div>

      <div className="shadow card" style={{ height: "100px", objectFit: "cover", backgroundSize: "cover", overflow: "hidden" }}>
        <h3 className="ps-3 my-4">Pakistani Foods</h3>
        <div className="womens_card d-flex flex-wrap justify-content-around gap-2">
          {kids.slice(0, 5).map((item, i) => (
            <Cards value={item} key={i} />
          ))}
        </div>

        <h3 className="mx-3 py-3 ps-5 mb-3" style={{ borderRadius: "10px" }}>
          Latest Product
        </h3>
      </div>

      
      <hr className="mx-4 my-5" />
      
    </div>
  );
}
