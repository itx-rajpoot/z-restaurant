import React from 'react';


import {others} from "../../../../component/Assets/card_images"

import Card from "../../../../component/cards"
 
import sliderImage_1 from "../../../../component/Assets/card_images/soup-2.jpg";
import sliderImage_2 from "../../../../component/Assets/card_images/salad-2.jpg";
import sliderImage_3 from "../../../../component/Assets/card_images/salad-3.jpg";
import { UseCartContext } from '../../../../context/CartContext';



export default function Others() {
  const {addToCart,isProcesingId}= UseCartContext()


  return (
    <main>
      <div className="container-fluid ">
        <div id="carouselExampleFade" className="carousel slide carousel-fade "  style={{height:"100vh"}} >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100" style={{objectFit:"cover",backgroundSize: 'cover',overflow:"hidden" }}>
              <img   src={sliderImage_1} className="d-block  w-100"  alt="sliderimage" 
              
              />
            </div>
            <div className="carousel-item  h-100" style={{objectFit:"cover",backgroundSize: 'cover',overflow:"hidden" }}>
              <img 
                src={sliderImage_2}  className="d-block  w-100"  alt="sliderimage" />
            </div>
            <div className="carousel-item h-100" style={{objectFit:"cover",backgroundSize: 'cover',overflow:"hidden" }}>
              <img  src={sliderImage_3}  className="d-block  w-100" alt="sliderimage"  />
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
        <div className="container d-flex flex-wrap justify-content-around  mt-4">
          {others.slice(0).map((item,i)=>(
              <Card value={item} key={i}   processingId={isProcesingId}  handleAddToCart={addToCart}/>
          ))}
        </div>

   
      </div>
    </main>
  );
}
