import ShopPageProduct from './ShopPageProduct';

const ShopContent = ({ products }) => {

  return (
    <div className='w-screen'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 px-2 py-[120px]'>
        {
          products?.map((product, index) => (
            product.shopifyId &&
            product.status === 'active' &&
            <ShopPageProduct { ...{ product, index } } key={ index } />
          ))
        }
      </div>
    </div>
  );
}

export default ShopContent;