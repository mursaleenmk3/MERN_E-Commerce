import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { TbTrash } from 'react-icons/tb';

function CartItems() {
  const { getTotalCartAmount, allProducts, cartItem, removeFromCart } = useContext(ShopContext);

  useEffect(() => {
    console.log('cartItem:', cartItem);
    console.log('allProducts:', allProducts);
  }, [cartItem, allProducts]);

  if (!allProducts || allProducts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className='max_padd_container pt-28 '>
      <table className='w-full mx-auto'>
        <thead>
          <tr className='bg-slate-900/10 regular-18 sm:regular-20 text-start py-12'>
            <th className='p-1 py-2'>Products</th>
            <th className='p-1 py-2'>Title</th>
            <th className='p-1 py-2'>Price</th>
            <th className='p-1 py-2'>Quantity</th>
            <th className='p-1 py-2'>Total</th>
            <th className='p-1 py-2'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((e) => {
            const quantity = cartItem[e.id] || 0; // Ensure quantity is at least 0
            if (quantity > 0) {
              return (
                <tr key={e.id} className='border-b text-gray-30 border-slate-900/20 p-6 medium-14 text-center'>
                  <td className='flexCenter'>
                    <img src={e.image} alt="product image" height={43} width={43} className='rounded-lg ring-slate-900/5 my-1' />
                  </td>
                  <td>
                    <div className='line-clamp-3'>{e.name}</div>
                  </td>
                  <td>${e.new_price}</td>
                  <td>{quantity}</td>
                  <td className='w-16 h-16 bg-white'>${e.new_price * quantity}</td>
                  <td>
                    <div className='bold-22 pl-14'>
                      <TbTrash onClick={() => removeFromCart(e.id)} />
                    </div>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <div className='flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px]'>
        <div className='flex flex-col gap-10'>
          <h4 className='bold-20'>Summary</h4>
          <div>
            <div className='flexBetween py-4'>
              <h4 className='medium-16'>Subtotal</h4>
              <h4 className='text-gray-30 font-samibold'>${getTotalCartAmount()}</h4>
            </div>
            <hr />
            <div className='flexBetween py-4'>
              <h4 className='medium-16'>Shipping Fee</h4>
              <h4 className='text-gray-30 font-samibold'>Free</h4>
            </div>
            <hr />
            <div className='flexBetween py-4'>
              <h4 className='medium-18'>Total:</h4>
              <h4 className='medium-18'>${getTotalCartAmount()}</h4>
            </div>
          </div>
          <button className='btn_dark_rounded w-44'>Checkout</button>
          <div className='flex flex-col gap-10'>
            <h4 className='bold-20 capitalize'>Enter your coupon code here:</h4>
            <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
              <input type="text" placeholder='Coupon code' className='bg-transparent border-none outline-none ' />
              <button className='btn_dark_rounded'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartItems;
