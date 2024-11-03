import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

import AddProducts from './AddProduct'
import ShowProducts from './ShowProducts'
import UpdateProduct  from './UpdateProduct'

export default function index() {
  return (
  <>
  
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/addproducts' element={<AddProducts/>}/>
      <Route path='/showallproducts' element={<ShowProducts/>}/>
      <Route path='/updateproduct' element={<UpdateProduct/>}/>
    </Routes>
    </>
  )
}
