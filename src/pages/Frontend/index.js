import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Header from "../../component/Header";
import  Footer  from '../../component/Footer';
import Womens from './Collection/Womens';
import Mens from './Collection/Mens';
import Kids from './Collection/Kids';
import Others from './Collection/Others';


export default function Frontend() {
  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> 
      <Route path="/home" element={<Home />} />
      <Route path="frontend/about" element={<About />} />
      <Route path="frontend/collection/fast-food" element={<Womens />} />
      <Route path="frontend/collection/dessert" element={<Mens />} />
      <Route path="frontend/collection/pak-food" element={<Kids />} />
      <Route path="frontend/collection/juices" element={<Others />} />
    

      <Route path="*" element={<div>404 Not Found</div>} /> 
       </Routes> 
    <Footer/>
    </>
  );
}
