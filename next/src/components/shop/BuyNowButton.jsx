import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import BuyNowButtonOptions from './BuyNowButtonOptions';
import BuyNowButtonColourOptions from './BuyNowButtonColourOptions';

const BuyNowButton = ({ shopifyId, product, }) => {

  const container = useRef();
  const { shopifyUI, shopifyCart, setCartIsOpen, currency, } = useSiteGlobals();

  const [ isRendered, setIsRendered ] = useState(false);
  const isRenderedRef = useRef();

  const [ variantChanges, setVariantChanges ] = useState(0);

  const [ variants, setVariants ] = useState([]);

  const productVariants = useMemo(() => {
    if (product?.variants?.length > 0) {
      return product.variants;
    }
    return [];
  }, [ product ]);

  const activeVariant = useMemo(() => {
    if (productVariants?.length > 0) {
      let productVariant = null;
      for (let i = 0; i < productVariants.length; i++) {
        let isMatch = true;
        const options = [ productVariants[ i ].option1, productVariants[ i ].option2, productVariants[ i ].option3 ];
        for (let variant of variants) {
          if (!options.includes(variant.active)) {
            isMatch = false;
          }
        }
        if (isMatch) {
          productVariant = productVariants[ i ].id;
        }
      }
      return productVariant;
    } else {
      return null;
    }
  }, [ variants, productVariants ]);

  useLayoutEffect(() => {
    let raf;

    const setupButton = () => {
      let node = container.current;
      if (!node) {
        raf = requestAnimationFrame(setupButton);
      } else {
        container.current.innerHTML = '';

        if (!shopifyUI) return;

        if (node && shopifyUI && shopifyId && shopifyUI?.components?.cart?.length > 0) {
          shopifyUI.createComponent('product', {
            id: shopifyId.toString(),
            variantId: activeVariant,
            node,
            moneyFormat: `${ currency.symbol }{{amount_no_decimals}}`,
            options: {
              product: {
                iframe: false,
                contents: {
                  img: false,
                  title: false,
                  price: false
                },
                text: {
                  button: 'Add to Cart'
                },
                order: [
                  'options',
                  'variantTitle',
                  'price',
                  'description',
                  'button',
                ],
                selectedOptions: {
                  Color: 'black',
                  Size: 'md'
                },
                events: {
                  addVariantToCart: function (product) {
                    setCartIsOpen(true);
                  },
                  afterRender: function (component) {
                    const variantsArray = [];
                    if (component.node) {
                      const variantNodes = component.node.querySelectorAll('.shopify-buy__option-select');
                      if (variantNodes.length > 0) {
                        variantNodes.forEach((node) => {
                          const values = [];
                          const select = node.querySelector('select');
                          const name = select.getAttribute('name').toLowerCase();
                          const options = select.querySelectorAll('option');

                          options.forEach((option) => {
                            values.push({
                              value: option.getAttribute('value'),
                              text: option.textContent
                            });
                          });

                          variantsArray.push({
                            name,
                            values,
                            select,
                            active: values[ 0 ].value,
                          });
                        });
                      }
                    }
                    if (!isRenderedRef.current) {
                      setVariants(variantsArray);
                      setIsRendered(true);
                      isRenderedRef.current = true;
                    }
                  },
                  afterUpdateConfig: function (component) {
                  },
                  DOMEvents: {
                    'click .option-input': function (event) {
                    }
                  },
                },
              },
              toggle: {
                iframe: false,
                contents: {
                  title: false,
                  price: false,
                  img: false,
                  button: 'Close'
                }
              },
            }
          });
        }
      }
    }

    setupButton();

    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ shopifyId, shopifyUI, shopifyUI?.components?.cart, shopifyCart, setCartIsOpen, currency.symbol, activeVariant, ]);

  useEffect(() => {
    if (variants?.length > 0 && isRendered) {
      for (let i = 0; i < variants?.length; i++) {
        const variant = variants[ i ];
        if (variant.active && variant.select) {
          const select = variant.select;
          const options = select.querySelectorAll('option');
          options.forEach((option) => {
            if (option.getAttribute('value') === variant.active) {
              option.selected = true;
            }
          });
        }
      }
    }
  }, [ variants, isRendered, ]);

  return (
    <div className=''>
      {
        variants?.map((variant, index) => (
          (
            variant.name.toLowerCase() === 'color' ||
            variant.name.toLowerCase() === 'colors' ||
            variant.name.toLowerCase() === 'colour' ||
            variant.name.toLowerCase() === 'colours') ?
          <BuyNowButtonColourOptions key={ index } { ...{ variant, variants, setVariants, variantChanges, setVariantChanges, } } />
          :
          <BuyNowButtonOptions key={ index } { ...{ variant, variants, setVariants, variantChanges, setVariantChanges, } } />
        ))
      }
      <div className='' ref={ container } />
    </div>
  );
};

export default BuyNowButton;