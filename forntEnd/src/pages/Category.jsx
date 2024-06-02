import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Item from '../components/Item';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

function Category({ Category, banner }) {
  const { allProducts } = useContext(ShopContext); // Make sure the context value is named correctly

  if (!allProducts) {
    // Handle case when allProducts is not yet available
    return null;
  }

  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div>
        <img src={banner} alt="" className="block my-7 mx-auto" />
      </div>
      <div className='flexBetween my-8 mx-2'>
        <h5><span className='flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-5xl ring-1 ring-state-900/15'>Showing 1-12</span> out of 36 products</h5>
        <div>Sort by<MdOutlineKeyboardArrowDown /></div>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {allProducts.map((item) => {
          if (Category === item.category) {
            return (
              <Item key={item.id} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}></Item>
            )
          }
        })}
      </div>
      <div className='mt-16 text-center'>
        <button className='btn_dark_rounded'>Learn More</button>
      </div>
    </section>
  )
}

export default Category;
