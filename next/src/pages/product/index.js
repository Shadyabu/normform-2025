import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Products = () => {

  const router = useRouter();

  useEffect(() => {
    router.push('/shop');
  }, [ router ]);

  return null;
};

export default Products;