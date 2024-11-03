import React, { useEffect } from 'react';
import {Image ,Carousel} from 'antd';

import girlSample from "../../../component/Assets/baner_images/sample-1.png";
import chairSample from "../../../component/Assets/baner_images/sample-1.png";
import Aos from 'aos';
import "aos/dist/aos.css";


export default function HeroSlider() {
    useEffect(() => {
        Aos.init();
    }, []);
    const carouselSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6 ,  
      slidesToScroll: 1, 
     
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        }, {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },{ breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },{breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },},], };


    return (
    
           <div className="container-fluid pb-5"  style={{ backgroundColor: "#f0efeb" }}>
        <div className="pt-4 d-flex justify-content-center  align-items-center "  >
        <div id="carouselExampleDark" className=" carousel slide carousel-fade"   style={{width:"90%",  height: "80vh" }}>
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  <div className="carousel-inner h-100" style={{ borderRadius: 10 }}>
                         <div className="carousel-item active h-100">
                             <img src={girlSample} className="d-block w-100 h-100" alt="..." style={{ borderRadius: 10, objectFit: 'cover' }} data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" />
                             <div className="carousel-caption d-flex flex-column align-items-end justify-content-center text-end" style={{ right: '10%', top: '10%' }}>
                                
                                <div className="div d-flex  flex-column align-items-center  text-dark">
                                <h5 style={{opacity:1, color: 'black'}}  data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1000" >Best in Fast Foods</h5>
                         
                                  <h2 className='fs-sm-2 fs-md-4' data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500" style={{color: 'black'}} >Z Restaurant  </h2>
                                  <h3 className='fs-sm-2 fs-md-4' style={{opacity:1, color: 'black'}} data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500" >Removing your hunger At only <span>$2.00</span></h3>
                                 <button className='btn btn-md shop-now px-4 my-2' style={{ color: 'white', backgroundColor: 'red',borderRadius:"50px" }}>Order Now</button>
                                 </div>
                             </div>
                        </div>
                          
    <div className="carousel-item h-100" data-bs-interval="2000">
      <img src={chairSample} className="d-block w-100 h-100" alt="..." />
      <div className="carousel-caption d-flex flex-column align-items-end justify-content-center text-end" style={{ right: '10%', top: '10%' }}>
                                
                                <div className="div d-flex  flex-column align-items-center  text-dark">
                                <h5 style={{opacity:0.5}} data-aos="fade-left"  data-aos-easing="linear" data-aos-duration="1500" >Best in Fast Foods</h5>
                                <h2 className='fs-sm-2 fs-md-4' data-aos="fade-left" data-aos-easing="linear" data-aos-duration="1500">Best Desserts <br />Yummy</h2>
                                  <h3 className='fs-sm-2 fs-md-4' style={{opacity:0.5}} data-aos="fade-left"  data-aos-easing="linear" data-aos-duration="1500">removing your hunger At only <span>$2.00</span></h3>
                                 <button className='btn btn-md shop-now px-4 my-2 ' style={{ color: 'white', backgroundColor: 'red',borderRadius:"50px" }}>Shop Now</button>
                                 </div>
                             </div>
                        </div>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>




<div className="mt-5 px-5" style={{ backgroundColor: "#f0efeb" }}>

  {/* <Carousel autoplay {...carouselSettings}>
  {slider_images.map((item, i) => (
          <div key={i} className="d-flex justify-content-center">
            <div className="card card-slider" style={{ width: '11rem', height: "15rem" }} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
              <Image preview={false} src={item.image} className="card-img-top " style={{ height: "150px" }} alt={item.name} />
              <div className="card-body card-inner">
                <p className="card-text text-center text-bold mb-1">{item.name}</p>
               
                <button className='btn w-100 shop-now  ' style={{ color: 'white', backgroundColor: 'red' }}>Shop Now</button>

              </div>
            </div>
          </div>
        ))}
  </Carousel> */}


</div> 
</div> 

    );
}
