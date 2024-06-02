import { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Login from './pages/Login'
import Footer from './components/Footer'
import bannermens from './assets/bannermens.png'
import bannerwomens from './assets/bannerwomens.png'
import bannerkids from './assets/bannerkids.png'

function App() {
  return (
     <main className='bg-primary text-tertiary '>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/mens" element={<Category Category="men" banner={bannermens}/>}/>
        <Route path="/womens" element={<Category Category="women" banner={bannerwomens}/>}/>
        <Route path="/kids" element={<Category Category="kid" banner={bannerkids}/>}/>
        <Route path="/product" element={<Product />}>
            {/* Nested Route for Product with productId parameter */}
            <Route path=':productId' element={<Product />} />
          </Route>
        <Route path="/cart-page" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
     

     </main>
   
  )
}

export default App
