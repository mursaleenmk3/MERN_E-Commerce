import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Slider from '../components/Slider';
import ListProduct from '../components/listProduct';  
import AddProduct from '../components/AddProduct';

function Admin() {
  return (
    <div className='lg:flex'>
      <Slider />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />  
      </Routes>
    </div>
  );
}

export default Admin;
