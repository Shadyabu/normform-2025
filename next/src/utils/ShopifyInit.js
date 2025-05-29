import { useEffect } from 'react';
import { useSiteGlobals } from './SiteGlobalsContext';
import ShopifyBuy from '@shopify/buy-button-js';

const ShopifyInit = () => {

  const { setShopifyClient, setShopifyUI } = useSiteGlobals();

  useEffect(() => {
    const shopifyClient = ShopifyBuy.buildClient({
      domain: 'norm-form.myshopify.com',
      storefrontAccessToken: 'adf711700e6ac128354ad61291de1fc6'
    });
    const ui = ShopifyBuy.UI.init(shopifyClient);

    setShopifyClient(shopifyClient);
    setShopifyUI(ui);
  }, [ setShopifyClient, setShopifyUI ]);

  return (
    <></>
  );
};

export default ShopifyInit;