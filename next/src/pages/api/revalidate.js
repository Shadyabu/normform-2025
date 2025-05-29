/**
 * This code is responsible for revalidating the cache when a project or person is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Filter: _type == "project" || _type == "person" || _type == "settings"
 * 6. Projection: Leave empty
 * 7. HTTP method: PROJECT
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the configuration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { createClient } from 'next-sanity';
import { parseBody } from 'next-sanity/webhook'
import groq from 'groq'

export { config } from 'next-sanity/webhook'

export default async function revalidate(req, res) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${ staleRoutes.join(', ') }`
    console.log(updatedRoutes, `body: ${body}`);
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err, 'error in revalidate')
    return res.status(500).send(err.message)
  }
}

async function queryStaleRoutes(body) {

  const client = createClient({ projectId: 'fhl3l9nr', dataset: 'production', apiVersion: 'v2022-05-01', useCdn: false })

  // Handle possible deletions
  if (body._type === 'page') {
    const exists = await client.fetch(groq`*[_id == $id][0]{ slug { current } }`, { id: body._id });
    if (!exists) {
      let staleRoutes = [ '/' ];
      staleRoutes.push(`/page/${ body.slug.current }`);
      // Assume that the page document was deleted. Query the datetime used to sort "More stories" to determine if the page was in the list.
      return [ ...new Set([ ...staleRoutes ]) ];
    }
  } else if (body._type === 'product' || body._type === 'collection') {
    const exists = await client.fetch(groq`*[_id == $id][0]{ store { slug { current } } }`, { id: body._id })
    if (!exists || body?.store?.isDeleted === true) {
      let staleRoutes = [ '/' ];
      if (body._type === 'product') {
        staleRoutes.push(`/product/${ body.store.slug.current }`);
      } else if (body._type === 'collection') {
        staleRoutes.push(`/shop/${ body.store.slug.current }`);
      }
      // Assume that the page document was deleted. Query the datetime used to sort "More stories" to determine if the page was in the list.
      return [ ...new Set([ ...staleRoutes ]) ];
    }
  }
  
  switch (body._type) {
    case 'settings':
      return queryAllRoutes(client)
    case 'home':
      return [ '/' ]
    case 'product':
      return await queryItemRoute(client, body)
    case 'productSize':
      return await queryColorOrSizeRoutes(client)
    case 'productColor':
      return await queryColorOrSizeRoutes(client)
    case 'shop':
      return [ '/shop' ]
    case 'collection':
      return queryItemRoute(client, body)
    case 'shopifyProductVariant':
      return queryItemRoute(client, body)
    case 'about':
      return [ '/about' ]
    case 'page':
      return queryItemRoute(client, body)
    case 'privacy':
      return [ '/privacy' ]
    case 'terms':
      return [ '/terms' ]
    case 'sizingChart':
      return await queryProductRoutes(client)
    case 'look':
      return [ '/' ]
    case 'shopSidebar':
      return await queryShopPageRoutes(client)
    case 'productResponsibility':
      return queryProductRoutes(client)
    case 'signUpForm':
      return queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function queryShopPageRoutes(client) {
  const collectionsQuery = groq`*[_type == 'collection'][]{ 'slug': store.slug.current }`;
  const collections = await client.fetch(collectionsQuery);
  const shop = '/shop';
  const collectionSlugs = collections.map((collection) => `${ shop }/${ collection.slug }`);
  return [ shop, ...collectionSlugs ];
}

async function queryProductRoutes(client) {
  const productsQuery = groq`*[_type == 'product'][]{ 'slug': store.slug.current }`;
  const products = await client.fetch(productsQuery);
  const productSlugs = products.map((product) => `/product/${ product.slug }`);
  return [ ...productSlugs ];
}

async function queryPageRoutes(client) {
  const pagesQuery = groq`*[_type == 'page'][]{ 'slug': slug.current }`;
  const pages = await client.fetch(pagesQuery);
  const pageSlugs = pages.map((page) => `/page/${ page.slug }`);
  return [ ...pageSlugs ];
}

async function queryColorOrSizeRoutes(client) {
  const productRoutes = await queryProductRoutes(client);
  const collectionRoutes = await queryShopPageRoutes(client);

  return [
    ...productRoutes,
    ...collectionRoutes 
  ];
}

function getSlug(type, body) {
  switch (type) {
    case 'product':
      return `/product/${ body.store.slug.current }`;
    case 'collection':
      return `/shop/${ body.store.slug.current }`;
    case 'page':
      return `/page/${ body.slug.current }`;
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    default:
      return '/';
  }
}

async function queryItemRoute(client, body) {
  
  const query = groq`*[_id == $id][0]{
    _type,
    store {
      slug {
        current
      },
    },
    slug {
      current
    },
    'references': *[references(^._id)][]{
      _type,
      store {
        slug {
          current
        }
      },
      slug {
        current
      },
    }
  }`;

  const result = await client.fetch(query, { id: body._id });
  const item = getSlug(body._type, body);

  const references = [];

  for (const reference of result.references) {
    references.push(getSlug(reference._type, reference));
  }

  return [
    '/',
    item,
    '/shop',
    ...references
  ];
}

async function queryAllStaticRoutes() {
  return [
    '/',
    '/shop',
    '/about',
    '/privacy',
    '/terms',
  ];
}

async function queryAllRoutes(client) {
  const staticRoutes = await queryAllStaticRoutes();
  const productRoutes = await queryProductRoutes(client);
  const collectionRoutes = await queryShopPageRoutes(client);
  const pageRoutes = await queryPageRoutes(client);

  return [
    ...staticRoutes,
    ...productRoutes,
    ...collectionRoutes,
    ...pageRoutes
  ];
}