'use client';
import { useState } from 'react';

export default function ProductAddToCartButton() {
  const [loading, setLoading] = useState(false);

  // ✅ Use plain variant ID as string
  const variantId = '40531676037229'; // must be string for URL

  const handleAddToCart = () => {
    setLoading(true);
    

    // ✅ No split needed
   const url = `https://norm-form.myshopify.com/cart/${variantId}:1`;
   console.log('url',url)
  //  window.location.href = url;
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {loading ? 'Adding...' : 'Buy Now'}
    </button>
  );
}
