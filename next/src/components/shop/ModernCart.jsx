import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cartManager from '@/utils/shopifyCart';

const ModernCart = () => {
  const { currency, setCartNumber } = useSiteGlobals();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize cart if not already done
    const initializeCart = async () => {
      if (!cartManager.getCart()) {
        await cartManager.initialize();
      }
    };
    
    initializeCart();

    // Subscribe to cart changes
    const unsubscribe = cartManager.subscribe((updatedCart) => {
      setCart(updatedCart);
      if (updatedCart) {
        setCartNumber(updatedCart.totalQuantity || 0);
      } else {
        setCartNumber(0);
      }
    });

    // Get current cart state
    const currentCart = cartManager.getCart();
    if (currentCart) {
      setCart(currentCart);
    }

    return unsubscribe;
  }, [setCartNumber]);

  const handleQuantityChange = async (lineId, newQuantity) => {
    if (newQuantity <= 0) {
      await cartManager.removeFromCart(lineId);
    } else {
      await cartManager.updateQuantity(lineId, newQuantity);
    }
  };

  const handleRemoveItem = async (lineId) => {
    await cartManager.removeFromCart(lineId);
  };

  const handleCheckout = async () => {
    console.log('Checkout clicked');
    console.log('Cart:', cart);
    console.log('Cart ID:', cart?.id);
    console.log('Cart checkoutUrl:', cart?.checkoutUrl);
    console.log('Cart manager cart:', cartManager.getCart());
    console.log('Cart manager methods:', Object.getOwnPropertyNames(cartManager));

    // useEffect(() => {
    //   // Whenever cart updates, store it in localStorage
    //   if (cart) {
    //     localStorage.setItem('checkoutCartData', JSON.stringify(cart));
    //   }
    // }, [cart]);
    
    // Ensure cart is initialized
    if (!cartManager.getCart()) {
      console.log('Cart not initialized, initializing...');
      await cartManager.initialize();
    }
    
    // Try to use the cart manager's checkout URL method
    let checkoutUrl;
    try {
      if (typeof cartManager.getCheckoutUrl === 'function') {
        checkoutUrl = cartManager.getCheckoutUrl();
        console.log('Using cart manager checkout URL:', checkoutUrl);
      } else {
        console.log('getCheckoutUrl method not available, using fallback');
        // Fallback method
        if (cart?.checkoutUrl) {
          checkoutUrl = cart.checkoutUrl;
        } else if (cart?.id) {
          const cartIdMatch = cart.id.match(/gid:\/\/shopify\/Cart\/([^?]+)/);
          if (cartIdMatch) {
            const cartId = cartIdMatch[1];
            checkoutUrl = `https://normform.world/cart/c/${cartId}`;
          }
        }
      }
    } catch (error) {
      console.error('Error getting checkout URL:', error);
      // Fallback method
      if (cart?.checkoutUrl) {
        checkoutUrl = cart.checkoutUrl;
      } else if (cart?.id) {
        const cartIdMatch = cart.id.match(/gid:\/\/shopify\/Cart\/([^?]+)/);
        if (cartIdMatch) {
          const cartId = cartIdMatch[1];
          checkoutUrl = `https://normform.world/cart/c/${cartId}`;
        }
      }
    }
    
    // If still no checkout URL, try to construct it from the cart ID
    if (!checkoutUrl && cart?.id) {
      const cartIdMatch = cart.id.match(/gid:\/\/shopify\/Cart\/([^?]+)/);
      if (cartIdMatch) {
        const cartId = cartIdMatch[1];
        // Use the correct domain from the cart checkout URL or fallback to myshopify domain
        const domain = cart.checkoutUrl ? new URL(cart.checkoutUrl).hostname : 'norm-form.myshopify.com';
        checkoutUrl = `https://${domain}/cart/c/${cartId}`;
      }
    }
    
    console.log('Final checkout URL:', checkoutUrl);
    console.log('Cart checkout URL from API:', cart?.checkoutUrl);
    console.log('Cart ID:', cart?.id);
    
    if (checkoutUrl) {
      console.log('Opening checkout URL in new tab:', checkoutUrl);
      window.open(checkoutUrl, '_blank');
    } else {
      console.error('No checkout URL available');
      // Final fallback: redirect to cart page
      const fallbackUrl = cart?.checkoutUrl ? new URL(cart.checkoutUrl).origin + '/cart' : 'https://norm-form.myshopify.com/cart';
      console.log('Using fallback URL:', fallbackUrl);
      window.open(fallbackUrl, '_blank');
    }
  };

  if (!cart) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, style: 'ease' }}
        className='w-full h-full'
      >
        <div className='w-full h-full relative'>
          <header className='w-full h-8 border-b border-b-black p-2'>
            <h2 className='uppercase leading-[1em]'>Cart</h2>
          </header>
          <div className='w-full h-full flex items-center justify-center'>
            <p className='text-center'>Loading cart...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, style: 'ease' }}
      className='w-full h-full'
    >
      <div className='w-full h-full relative'>
        <header className='w-full h-8 border-b border-b-black p-2'>
          {cart.totalQuantity > 0 && (
            <h2 className='uppercase leading-[1em]'>Cart</h2>
          )}
        </header>
        



        {/* <div className='w-full h-full overflow-y-scroll'>
  {Array.isArray(cart?.lines?.edges) && cart.lines.edges.length > 0 ? (
    <div className='w-full'>
      {cart.lines.edges.map(({ node: lineItem }) => (
        <div key={lineItem.id} className='w-full border-b border-black p-4'>
        <div className='flex items-start gap-4'>
          {lineItem.merchandise.product.images.edges[0] && (
            <img
              src={lineItem.merchandise.product.images.edges[0].node.url}
              alt={lineItem.merchandise.product.images.edges[0].node.altText || ''}
              className='w-16 h-16 object-cover'
            />
          )}
          
          <div className='flex-1'>
            <h3 className='font-medium'>{lineItem.merchandise.product.title}</h3>
            <p className='text-sm text-gray-600'>{lineItem.merchandise.title}</p>
            <p className='text-sm'>
              {currency.symbol}{parseFloat(lineItem.merchandise.price.amount).toFixed(2)}
            </p>
            
            <div className='flex items-center gap-2 mt-2'>
              <button
                onClick={() => handleQuantityChange(lineItem.id, lineItem.quantity - 1)}
                disabled={isLoading}
                className='w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'
              >
                -
              </button>
              <span className='w-8 text-center'>{lineItem.quantity}</span>
              <button
                onClick={() => handleQuantityChange(lineItem.id, lineItem.quantity + 1)}
                disabled={isLoading}
                className='w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(lineItem.id)}
                disabled={isLoading}
                className='ml-4 text-sm underline hover:no-underline'
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      ))}
       <div className='p-4 border-t border-black'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='font-medium'>Subtotal:</span>
                  <span className='font-medium'>
                    {currency.symbol}{parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className='w-full px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-200'
                >
                  Checkout
                </button>
              </div>
    </div>
  ) : (
    <div className='p-4 text-center'>
      <p>Your cart is empty</p>
    </div>
  )}
</div> */}


        <div className='w-full h-full overflow-y-scroll'>
          {cart.lines.edges.length === 0 ? (
            <div className='p-4 text-center'>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className='w-full'>
              {cart.lines.edges.map(({ node: lineItem }) => (
                <div key={lineItem.id} className='w-full border-b border-black p-4'>
                  <div className='flex items-start gap-4'>
                    {lineItem.merchandise.product.images.edges[0] && (
                      <img
                        src={lineItem.merchandise.product.images.edges[0].node.url}
                        alt={lineItem.merchandise.product.images.edges[0].node.altText || ''}
                        className='w-16 h-16 object-cover'
                      />
                    )}
                    
                    <div className='flex-1'>
                      <h3 className='font-medium'>{lineItem.merchandise.product.title}</h3>
                      <p className='text-sm text-gray-600'>{lineItem.merchandise.title}</p>
                      <p className='text-sm'>
                        {currency.symbol}{parseFloat(lineItem.merchandise.price.amount).toFixed(2)}
                      </p>
                      
                      <div className='flex items-center gap-2 mt-2'>
                        <button
                          onClick={() => handleQuantityChange(lineItem.id, lineItem.quantity - 1)}
                          disabled={isLoading}
                          className='w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'
                        >
                          -
                        </button>
                        <span className='w-8 text-center'>{lineItem.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(lineItem.id, lineItem.quantity + 1)}
                          disabled={isLoading}
                          className='w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors'
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(lineItem.id)}
                          disabled={isLoading}
                          className='ml-4 text-sm underline hover:no-underline'
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className='p-4 border-t border-black'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='font-medium'>Subtotal:</span>
                  <span className='font-medium'>
                    {currency.symbol}{parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className='w-full px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-200'
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernCart;