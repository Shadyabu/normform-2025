import blockContent from './blockContent';
import home from './home'
import about from './about'
import settings from './settings';
import richTextSimple from './components/blocks/richTextSimple';
import richText from './components/blocks/richText';
import linkExternal from './components/links/linkExternal';
import linkInternal from './components/links/linkInternal';
import linkEmail from './components/links/linkEmail';
import annotationLinkExternal from './components/blocks/annotations/linkExternal';
import annotationLinkInternal from './components/blocks/annotations/linkInternal';
import annotationLinkEmail from './components/blocks/annotations/linkEmail';
import product from './product';
import productVariant from './variant';
import collection from './collection';
import privacy from './privacy';
import terms from './terms';
import page from './page';
import ctaMarquee from './components/ctaMarquee';
import look from './look';
import productWithVariant from './productWithVariant';
import ProxyString from './components/ProxyString';
import ShopifyCollection from './ShopifyCollection';
import collectionRule from './collectionRule';
import seoShopify from './seoShopify';
import PlaceholderString from './components/PlaceholderString';
import shopifyProductVariant from './shopifyProductVariant';
import shopSidebar from './shopSidebar';
import shopResponsibility from './shopResponsibility';
import productColor from './productColor';
import productSize from './productSize';
import shop from './shop';
import sizingChart from './sizingChart';
import signupForm from './signupForm';
import blockDropdown from './blockDropdown';

export const schemaTypes = [
  home,
  about,
  page,
  shop,
  sizingChart,
  product,
  productVariant,
  productWithVariant,
  productColor,
  productSize,
  settings,
  ShopifyCollection,
  shopifyProductVariant,
  shopSidebar,
  shopResponsibility,
  PlaceholderString,
  collectionRule,
  seoShopify,
  collection,
  privacy,
  terms,

  annotationLinkExternal,
  annotationLinkInternal,
  annotationLinkEmail,

  blockDropdown,
  blockContent,
  ProxyString,
  ctaMarquee,
  signupForm,
  look,

  richTextSimple,
  linkExternal,
  linkInternal,
  linkEmail,
  richText,
];