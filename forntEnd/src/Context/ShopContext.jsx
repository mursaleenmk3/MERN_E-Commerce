import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  // Initialize cart from localStorage or use default cart
  const [cartItem, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || getDefaultCart()
  );
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch all products
    fetch("http://localhost:4000/allproducts")
        .then((response) => response.json())
        .then((data) => setAllProducts(data));

    // Fetch cart items if auth-token is present
    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', // Correct content type
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // Body can be omitted if not needed
        })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
}, []);


  //   fetchProducts();
  // }, []);

  // // Store cart in localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItem));
  // }, [cartItem]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
    if (localStorage.getItem('auth-token')) {
    fetch("http://localhost:4000/addtocart", {
    method: 'POST',
    headers: {
    Accept: 'application/form-data',
    'auth-token': `${localStorage.getItem('auth-token')}`,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({"itemId": itemId}),
    
    }).then((response) => response.json()).then((data) => console.log(data));
    }}

    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({...prev, [itemId]: prev[itemId] -1}))
      if(localStorage.getItem('auth-token')) {
      fetch("http://localhost:4000/removefromcart", {
      method: 'POST',
      headers: {
      Accept: 'application/form-data',
      'auth-token': `${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({"itemId": itemId}),
      }).then((response) => response.json()).then((data) => console.log(data));
      }}
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = allProducts.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItem,
    allProducts,
    cartItem,
    addToCart,
    removeFromCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
