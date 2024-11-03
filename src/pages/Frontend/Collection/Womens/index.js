import React from 'react';


import {womens} from "../../../../component/Assets/card_images"
import Card from "../../../../component/cards"
 
import sliderImage_1 from "../../../../component/Assets/card_images/pasta-1.jpg";
import sliderImage_2 from "../../../../component/Assets/card_images/pasta-2.jpg";
import sliderImage_3 from "../../../../component/Assets/card_images/pasta-3.jpg";

import { Carousel,Image } from 'antd';
import { UseCartContext } from '../../../../context/CartContext';

export default function Womens() {
  const {addToCart,isProcesingId}= UseCartContext()


  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,  // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
  
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      }, {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },{ breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },{breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },},], };
  return (
    <main>
      <div className="container-fluid ">
        <div id="carouselExampleFade" className="carousel slide carousel-fade "  style={{height:"100vh"}} >
          <div className="carousel-inner h-100">
            <div className="carousel-item active">
              <img   src={sliderImage_1} className="d-block h-100 w-100"  alt="sliderimage" 
              
              />
            </div>
            <div className="carousel-item">
              <img 
                src={sliderImage_2}  className="d-block h-100 w-100"  alt="sliderimage" />
            </div>
            <div className="carousel-item">
              <img  src={sliderImage_3}  className="d-block h-100 w-100" alt="sliderimage"  />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-around mt-4">
          {womens.slice(0).map((item,i)=>(
              <Card value={item} key={i}  processingId={isProcesingId}  handleAddToCart={addToCart} />
          ))}
        </div>

        
      </div>
    </main>
  );
}
