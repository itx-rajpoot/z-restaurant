import React, { useEffect, useState } from 'react';


// import {mens} from "../../../../component/Assets/card_images"


import Card from "../../../../component/cards"
 
import sliderImage_1 from "../../../../component/Assets/baner_images/5.jpg";
import sliderImage_2 from "../../../../component/Assets/baner_images/6.jpg";
import sliderImage_3 from "../../../../component/Assets/baner_images/8.jpg";

import { Button } from 'antd';
// import { useCartContext } from '../../../../context/AddCartContext';
import { UseCartContext } from '../../../../context/CartContext';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase';



export default function Mens() {
  const {addToCart,isProcesingId}= UseCartContext()
const [limit , setLimit] = useState(12)
const [mens,setMens] =useState([])

  
  useEffect(() => {
    const fetchDocument = async () => {
      
      const array = [];
      const querySnapshot = await getDocs(collection(firestore, "addProduct"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        array.push(data);
        

      });
      setMens(array);
      
    };
    fetchDocument();
  }, []);






// console.log("mens", mens);

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
        <div className="container gap-3 d-flex flex-wrap justify-content-around mt-4">
          {mens.map((item,i)=>{
            return  <Card value={item} processingId={isProcesingId}  handleAddToCart={addToCart} key={i} />
            })}
        </div>
        {limit < mens.length?(
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
