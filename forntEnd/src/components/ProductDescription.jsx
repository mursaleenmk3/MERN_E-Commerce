import React from 'react'

function ProductDescription() {
  return (
   <div className='mt-20'>
    <div className='flex gap-3 mb-4' >
        <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Descrption</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide </button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
    </div>
    <div className='flex flex-col pb-16 '>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptate enim similique eum recusandae facilis maxime tempore voluptatum quae vero pariatur eligendi, commodi at consequatur placeat? Vero neque officia aspernatur.</p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptate enim similique eum recusandae facilis maxime tempore voluptatum quae vero pariatur eligendi, commodi at consequatur placeat? Vero neque officia aspernatur.</p>
    </div>
   </div>
  )
}

export default ProductDescription