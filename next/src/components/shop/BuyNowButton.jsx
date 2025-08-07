import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import BuyNowButtonOptions from './BuyNowButtonOptions';
import BuyNowButtonColourOptions from './BuyNowButtonColourOptions';
import cartManager from '@/utils/shopifyCart';

const BuyNowButton = ({ shopifyId, product }) => {
  const { setCartIsOpen, currency } = useSiteGlobals();
  const [isLoading, setIsLoading] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const productVariants = useMemo(() => {
    if (product?.variants?.length > 0) {
      return product.variants;
    }
    return [];
  }, [product]);

  // Set up variant options
  useEffect(() => {
    if (productVariants.length > 0) {
      const variantOptions = [];
      
      // Extract option names from first variant
      const firstVariant = productVariants[0];
      const optionNames = [];
      
      if (firstVariant.option1) optionNames.push(firstVariant.option1);
      if (firstVariant.option2) optionNames.push(firstVariant.option2);
      if (firstVariant.option3) optionNames.push(firstVariant.option3);

      // Create variant options structure
      optionNames.forEach((optionName, index) => {
        const values = [];
        productVariants.forEach(variant => {
          const optionValue = [variant.option1, variant.option2, variant.option3][index];
          if (optionValue && !values.find(v => v.value === optionValue)) {
            values.push({
              value: optionValue,
              text: optionValue
            });
          }
        });

        variantOptions.push({
          name: optionName.toLowerCase(),
          values,
          active: values[0]?.value || '',
        });
      });

      setVariants(variantOptions);
      setSelectedVariant(productVariants[0]);
    }
  }, [productVariants]);

  // Update selected variant when options change
  useEffect(() => {
    if (variants.length > 0 && productVariants.length > 0) {
      const matchingVariant = productVariants.find(variant => {
        console.log('matchingVariant variant',variant)
        const options = [variant.option1, variant.option2, variant.option3];

        console.log('matchingVariant options',options)
        return variants.every(variantOption => 
          options.includes(variantOption.active)
        );
      });
      
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
      }
    }
  }, [variants, productVariants]);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      console.error('No variant selected');
      return;
    }

    setIsLoading(true);
    try {
      // Use the Global ID (gid) instead of numeric ID for Shopify Storefront API
      const variantGid = selectedVariant.gid || selectedVariant.id;
      await cartManager.addToCart(variantGid, 1);
      setCartIsOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // If cart was recreated, try adding again
      if (error.message.includes('Cart was recreated')) {
        console.log('Retrying add to cart after cart recreation...');
        try {
          const variantGid = selectedVariant.gid || selectedVariant.id;
          await cartManager.addToCart(variantGid, 1);
          setCartIsOpen(true);
        } catch (retryError) {
          console.error('Error on retry:', retryError);
          // You could show a toast notification here
        }
      }
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariantChange = (variantName, newValue) => {
    setVariants(prevVariants => 
      prevVariants.map(variant => 
        variant.name === variantName 
          ? { ...variant, active: newValue }
          : variant
      )
    );
  };
  console.log('setVariants',selectedVariant)
  console.log('variants',variants)

  return (
    <div className=''>
      {variants.map((variant, index) => (
        console.log('main variant',variant),
        (variant.name.toLowerCase() === 'color' ||
         variant.name.toLowerCase() === 'colors' ||
         variant.name.toLowerCase() === 'colour' ||
         variant.name.toLowerCase() === 'colours') ? (
          <BuyNowButtonColourOptions 
            key={index} 
            variant={variant}
            variants={variants}
            setVariants={setVariants}
            onVariantChange={handleVariantChange}
          />
        ) : (
          <BuyNowButtonOptions 
            key={index} 
            variant={variant}
            variants={variants}
            setVariants={setVariants}
            onVariantChange={handleVariantChange}
          />
        )
      ))}
      
      <div class="shopify-buy__btn-wrapper" data-element="product.buttonWrapper">
      <button
  onClick={handleAddToCart}
  disabled={isLoading || !selectedVariant || !selectedVariant?.isAvailable}
  className='shopify-buy__btn'
>
  {isLoading
    ? 'Adding...'
    : selectedVariant?.isAvailable
      ? 'Add to Cart'
      : 'Sold Out'}
</button>

      </div>
    </div>
  );
};

export default BuyNowButton;