import React, { useState } from 'react';


import {kids} from "../../../../component/Assets/card_images"
// import {mens} from "../../../Dashboard/ShowProducts" 

import Card from "../../../../component/cards"
 
import sliderImage_1 from "../../../../component/Assets/card_images/bbq-1.jpg";
import sliderImage_2 from "../../../../component/Assets/card_images/bbq-2.jpg";
import sliderImage_3 from "../../../../component/Assets/card_images/saji-1.jpg";

import { Button } from 'antd';
import { UseCartContext } from '../../../../context/CartContext';



export default function Kids() {
  const {addToCart,isProcesingId}= UseCartContext()
const [limit , setLimit] = useState(12)
// console.log("mens", mens);

  return (
    <main>
      <div className="container-fluid ">
        <div id="carouselExampleFade" className="carousel slide carousel-fade "  style={{height:"100vh"}} >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100" style={{objectFit:"cover",backgroundSize: 'cover',overflow:"hidden" }}>
              <img   src={sliderImage_1} className="d-block  w-100"  alt="sliderimage" />
            </div>
            <div className="carousel-item  h-100" style={{objectFit:"cover",backgroundSize: 'cover',overflow:"hidden" }}>
              <img  src={sliderImage_2}  className="d-block  w-100"  alt="sliderimage" />
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
        <div className="container gap-3 d-flex flex-wrap justify-content-around mt-4">
          {kids.slice(0,limit).map((item,i)=>{
            return  <Card value={item} processingId={isProcesingId}  handleAddToCart={addToCart} key={i} />
            })}
        </div>
        {limit < kids.length?(
          <div className="row">
            <div className="col text-center my-3">
            <Button type='primary' onClick={()=>{setLimit(limit+8)}}>Load more</Button>

            </div>
          </div>
        ):
        <div className="row">
          <div className="col text-center my-3">
          <Button danger onClick={()=>{setLimit(12)}}>see less</Button>

          </div>
        </div>
        }
  
      </div>
    </main>
  );
}
