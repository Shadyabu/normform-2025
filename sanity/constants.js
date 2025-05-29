

// Document ids which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_IDS = [ 'home', 'shop', 'settings', 'info', 'privacy', 'terms', ];

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: 'home' },
  { type: 'shop' },
  { type: 'about' },
  { type: 'product' },
  { type: 'page' },
  { type: 'privacy' },
  { type: 'terms' },
];

export const DEFAULT_CURRENCY_CODE = 'USD';

export const SHOPIFY_STORE_ID = 'norm-form.myshopify.com';

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2021-06-07'