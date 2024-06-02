import React from 'react'
import {Link} from "react-router-dom"
import addProduct from '../assets/addproduct.png'
import listProduct from '../assets/productlist.png'
function Slider() {
  return (
   <div className='py-7 flex justify-center gap-x-1 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
    <Link to={'/addproduct'}>
    <button className='flexCenter gap-x-2 rounded-md bg-primary h-12 w-44 medium-14 sm:medium-15 xs:w-44'>
      <img src={addProduct} alt="" height={44} width={44} />
      <span>Add Product</span>
    </button>
    </Link>
    <Link to={'/listproduct'}>
    <button  className='flexCenter gap-x-2 rounded-md bg-primary h-13 w-44 medium-14 sm:medium-15 xs:w-44'>
      <img src={listProduct} alt="" height={44} width={44} />
      <span>Product List</span>
    </button>
    </Link>
   </div>
  )
}

export default Slider