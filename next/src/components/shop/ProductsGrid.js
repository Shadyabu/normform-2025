import ShopPageProduct from './ShopPageProduct';

const ProductsGrid = ({ products }) => {

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3'>
      {
        products?.map((product, index) => (
          <ShopPageProduct key={ index } product={ product } productsLength={ products.length } index={ index } />
        ))
      }
    </div>
  );
};

export default ProductsGrid;