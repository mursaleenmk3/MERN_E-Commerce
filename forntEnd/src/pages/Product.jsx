import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import ProductHdr from '../components/ProductHdr';
import ProductDisplay from '../components/ProductDisplay';
import ProductDescription from '../components/ProductDescription';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  // Check if allProducts is defined and not empty before attempting to find the product
  if (!allProducts || allProducts.length === 0) {
    return <div>Loading...</div>; // Or a custom loading component
  }

  const product = allProducts.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className='max_padd_container py-28'>
      <ProductHdr product={product} />
      <ProductDisplay product={product} />
      <ProductDescription />
      <RelatedProducts />
    </section>
  );
}

export default Product;
