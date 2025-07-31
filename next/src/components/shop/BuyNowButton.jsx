'use client';
import { useState, useEffect } from 'react';

const STOREFRONT_API_TOKEN = 'bb705fb46bc52390bbdc47e8474c0877';
const SHOP_DOMAIN = 'norm-form.myshopify.com';
const API_ENDPOINT = `https://${SHOP_DOMAIN}/api/2024-07/graphql.json`;
const PRODUCT_HANDLE = 'notso'; // Change to your product handle

const BuyNowButton = () => {
  const [variantId, setVariantId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Fetch variantId
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
        },
        body: JSON.stringify({
          query: `
            query GetProductByHandle($handle: String!) {
              productByHandle(handle: $handle) {
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          `,
          variables: {
            handle: PRODUCT_HANDLE,
          },
        }),
      });

      const json = await res.json();
      const id = json?.data?.productByHandle?.variants?.edges?.[0]?.node?.id;
      setVariantId(id);
    };

    fetchProduct();
  }, []);

  // Step 2: Handle Buy Now
  const handleBuyNow = async () => {
    console.log('variantId',variantId)
    if (!variantId) {
      alert('Variant not ready');
      return;
    }

    setLoading(true);

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation CartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            lines: [
              {
                quantity: 1,
                merchandiseId: variantId,
              },
            ],
          },
        },
      }),
    });

    const json = await res.json();
    setLoading(false);

    const errors = json?.data?.cartCreate?.userErrors;
    if (errors && errors.length > 0) {
      alert('Error: ' + errors[0].message);
      return;
    }

    const checkoutUrl = json?.data?.cartCreate?.cart?.checkoutUrl;
    console.log('checkoutUrl',checkoutUrl)
    if (checkoutUrl) {
    //  window.location.href = checkoutUrl;
    } else {
      alert('Failed to create cart');
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading || !variantId}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
};

export default BuyNowButton;
