import React, { useEffect, useState } from 'react';
import Item from './Item';

function NewCollection() {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((response) => response.json())
      .then((data) => setNewCollection(data))
      .catch((error) => console.error("Error fetching new collection:", error));
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <section className='bg-primary'>
      <div className='max_padd_container py-12 xl:py-28 xl:w-[88%]' >
        <h3 className='h3 text-center'>Recent Products</h3>
        <hr className="h-3 md:w-1/2 mx-auto bg-gradient-to-r from-transparent via-black to-transparent mb-16" />

        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {newCollection.map((item) => (
            <Item key={item.id} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}></Item>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewCollection;
