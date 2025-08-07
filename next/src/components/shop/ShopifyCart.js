import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef, useState, } from 'react';
import { motion } from 'framer-motion';

const ShopifyCart = () => {

  const { shopifyUI, cartNumber, setCartNumber, setShopifyCart, currency, } = useSiteGlobals();
  const cartRef = useRef();

  const [ cartRefreshIterations, setCartRefreshIterations ] = useState(0);

  useEffect(() => {
    let timeout;
    const handleClick = (e) => {
      if (e?.target?.className.indexOf('shopify-buy__quantity-decrement') > -1) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setCartRefreshIterations(prev => prev + 1);
        }, 1200);
      }
    };

    setCartRefreshIterations(prev => prev + 1);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      clearTimeout(timeout);
    };
  }, [ cartNumber ]);

  useEffect(() => {
    // if (cartIsInitialised === false) {
    if (!shopifyUI) return;
    // if (shopifyUI.components?.cart?.length > 0) return;
    
    let raf;
  
    const createCartUI = () => {
      console.log('Creating Shopify cart UI');
      console.log('Shopify UI:', shopifyUI);
      console.log('Cart ref:', cartRef.current);


      

      if (cartRef.current) {
        cartRef.current.innerHTML = '';

        const newCart = shopifyUI.createComponent('cart', {
          moneyFormat: `${ currency.symbol }{{amount_no_decimals}}`,
          node: document.getElementById('cart'),
          domain: 'norm-form.myshopify.com',
          options: {
            toggle: {
              iframe: false,
            },
            cart: {
              startOpen: true,
              popup: false,
              iframe: false,
              contents: {
                title: false,
                lineItems: true,
                footer: true,
                note: false,
                discounts: false,
                images: true,
              },
              buttonDestination: 'checkout',
              text: {
                button: 'Checkout',
                notice: 'Shipping and discount codes are added at checkout.',
                subtotal: 'Subtotal',
                total: 'Total',
                empty: 'Your cart is empty.',
                button_no_items: 'Checkout',
                button_with_items: 'Checkout',
              },
              styles: {
                button: {
                  'background-color': '#000000',
                  'color': '#ffffff',
                  ':hover': {
                    'background-color': '#ffffff',
                    'color': '#000000',
                  },
                },
              },
              events: {
                beforeRender: (cart) => {
                  console.log('Cart beforeRender event:', cart);
                  let number = 0;
                  const lineItems = cart.lineItemCache;
                  for (let lineItem of lineItems) {
                    if (typeof lineItem?.quantity !== 'undefined') {
                      number += lineItem.quantity;
                    };
                  }
                  setCartNumber(number);
                },
                afterRender: (cart) => {
                  console.log('Cart afterRender event:', cart);
                  console.log('Cart checkout URL:', cart.checkoutUrl);
                },
                updateItemQuantity: (cart) => {
                  let number = 0;
                  const lineItems = cart.lineItemCache;
                  for (let lineItem of lineItems) {
                    if (typeof lineItem?.quantity !== 'undefined') {
                      number += lineItem.quantity;
                    };
                  }
                  setCartNumber(number);
                  if (cart.lineItemCache?.length === 0) {
                  }
                },
                checkout: (cart) => {
                  // Redirect to Shopify checkout
                  console.log('Shopify cart checkout event triggered');
                  console.log('Cart checkout URL:', cart.checkoutUrl);
                  console.log('Cart data:', cart);
                  if (cart.checkoutUrl) {
                    console.log('Opening checkout URL:', cart.checkoutUrl);
                    window.open(cart.checkoutUrl, '_blank');
                  } else {
                    console.error('No checkout URL available in cart');
                  }
                }
              }
            },
          }
   
        });
        console.log('Created new cart component:', newCart);
        setShopifyCart(newCart);
              } else {
          console.log('Cart ref not ready, retrying...');
          raf = requestAnimationFrame(createCartUI);
        }
      }

            createCartUI();
      
      return () => {
        console.log('Cleaning up cart component');
        cancelAnimationFrame(raf);
      }
    }, [ shopifyUI?.createComponent, setShopifyCart, setCartNumber, currency.symbol, cartRefreshIterations ]);

  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.5, style: 'ease' } }
      className='w-full h-full'
    >
      <div className='w-full h-full relative'>
        <header className='w-full h-8 border-b border-b-black p-2'>
          {
            cartNumber > 0 &&
            <h2 className='uppercase leading-[1em]'>Cart</h2>
          }
        </header>
        <div className='w-full h-full'>
          <div id='cart' ref={ cartRef } className='h-full overflow-y-scroll' />
        </div>
      </div>
    </motion.div>
  )
}

export default ShopifyCart;