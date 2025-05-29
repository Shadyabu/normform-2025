import fetch from 'isomorphic-unfetch';

const SHOPIFY_STORE_URL = 'https://norm-form.myshopify.com/api/2023-04/graphql.json';
const SHOPIFY_ACCESS_TOKEN = 'adf711700e6ac128354ad61291de1fc6';

export async function fetchShopifyData(query, variables = {}) {
  const res = await fetch(SHOPIFY_STORE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}