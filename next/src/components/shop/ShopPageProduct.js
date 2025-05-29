import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import ShopPageColourOptions from './ShopPageColourOptions';

const ShopPageProduct = (props) => {

  const { product, productsLength, index } = props;

  const productData = useMemo(() => {
    if (!product) return {};
    const newProduct = {};
    newProduct.title = product.title;
    newProduct.price = product.priceRange?.minVariantPrice?.amount;
    newProduct.previewImageUrl = product?.images?.edges[ 0 ]?.node?.src;
    newProduct.slug = product.handle;

    if (product.options?.find((option) => option.name === 'Size')
      ||
      product.options?.find((option) => option.name === 'size')
    ) {
      let sizesData = product.options?.find((option) => option.name === 'size')?.values;
      if (!sizesData) sizesData = product.options?.find((option) => option.name === 'Size')?.values;
      newProduct.sizesData = sizesData?.map((size) => ({ title: size, value: size }));
    }

    if (product.options?.find((option) => option.name === 'Color')
      ||
  product.options?.find((option) => option.name === 'color')) {
      let colorsData = product.options?.find((option) => option.name === 'color')?.values;
      if (!colorsData) colorsData = product.options?.find((option) => option.name === 'Color')?.values;
      newProduct.colorsData = colorsData?.map((color) => ({ value: color, title: color }));
    }
    return newProduct;
  }, [ product ]);

  const { slug } = productData;
  const [ imageIsLoaded, setImageIsLoaded ] = useState(false);
  const { currency, windowWidth } = useSiteGlobals();
  
  const formattedPrice = useMemo(() => {
    let price = productData?.price ? `${ currency.symbol }${ productData.price.toString() }` : '';
    if (price.indexOf('.') === -1) {
      price += '.00';
    } else if (price.indexOf('.') === price.length - 2) {
      price += '0';
    }
    return price;
  }, [ productData, currency ]);

  const isInBottomRow = useMemo(() => {
    if (windowWidth >= 768) {
      const rows = Math.ceil(productsLength / 3);
      return index >= (rows - 1) * 3;
    } else {
      const rows = Math.ceil(productsLength / 2);
      return index >= (rows - 1) * 2;
    }
  }, [ productsLength, index, windowWidth ]);
  
  useEffect(() => {
    const img = document.createElement('img');
    img.onload = () => {
      setImageIsLoaded(true);
    };
    img.src = productData?.previewImageUrl;
  }, [ productData ]);
  
  return (
    <div
      className='col-span-1 border-r border-r-black sm:[&:nth-child(3n)]:border-r-0 relative group'
      style={ {
        borderBottom: isInBottomRow === false ? '1px solid black' : 'none',
        borderRight: windowWidth >= 768 ?
          index % 3 <= 1 ? '1px solid black' : 'none'
          :
          index % 2 === 0 ? '1px solid black' : 'none',
      } }
    >
      <div className='block relative overflow-hidden z-[1]'>
        <Link href={ `/product/${ slug }` } className='block p-4 sm:p-12 aspect-square transition-scale duration-300 relative group'>
          <img className='block' src={ productData?.previewImageUrl } alt={ '' }
            style={ {
              opacity: imageIsLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            } }
          />
            {
              windowWidth >= 768 &&
              <div className='absolute top-0 left-0 p-4 mouse:opacity-0 mouse:group-hover:opacity-100 transition-opacity duration-300'>
                <h2 className='font-bold'>{ productData.title }</h2>
                <p className='font-normal'>{ formattedPrice }</p>
              </div>
            }
        </Link>
        {
          productData?.colorsData?.length > 1 &&
          <ShopPageColourOptions variant={ { values: productData.colorsData } } />
        }
        {
          windowWidth >= 768 &&
          productData?.sizesData?.length > 0 &&
          <div className='absolute bottom-[-1px] left-0 w-full h-8 flex border-t border-black justify-start items-end transition-opacity duration-300 mouse:opacity-0 mouse:group-hover:opacity-100'>
            {
              productData?.sizesData?.map((size, index) => (
                <button
                  key={ index }
                  className='block w-8 h-8 border-r border-black last:border-r-0 text-center leading-8 w-full mouse:hover:bg-black mouse:hover:text-white !mouse:hover:font-normal'
                >
                  { size.title }
                </button>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
}

export default ShopPageProduct;