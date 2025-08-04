import { fetchShopifyData } from './fetchShopifyData';

// Cart management using Shopify Storefront API
class ShopifyCartManager {
  constructor() {
    this.cartId = null;
    this.fullCartId = null; // Store the full cart ID with query parameters
    this.cart = null;
    this.listeners = [];
  }

  // Initialize cart
  async initialize() {
    try {
      // Check if localStorage is available
      if (typeof window === 'undefined' || !window.localStorage) {
        return await this.createCart();
      }

      // Try to get existing cart from localStorage
      const savedCartId = localStorage.getItem('shopify_cart_id');
      
      if (savedCartId) {
        // Check if cart still exists
        const cart = await this.getCartById(savedCartId);
        
        if (cart) {
          this.cartId = savedCartId;
          this.fullCartId = cart.id; // Store the full cart ID from the response
          this.cart = cart;
          this.notifyListeners();
          return cart;
        } else {
          localStorage.removeItem('shopify_cart_id');
        }
      }
      
      // Create new cart
      return await this.createCart();
    } catch (error) {
      console.error('Error initializing cart:', error);
      return null;
    }
  }

  // Create new cart
  async createCart() {
    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const result = await fetchShopifyData(mutation, {
        input: {}
      });

      if (result.cartCreate.userErrors.length > 0) {
        throw new Error(result.cartCreate.userErrors[0].message);
      }

      this.cartId = result.cartCreate.cart.id;
      this.cart = result.cartCreate.cart;
      
      // Store both the full cart ID and clean cart ID
      this.fullCartId = this.cartId;
      const cleanCartId = this.cartId.split('?')[0];
      
      // Save clean cart ID to localStorage
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('shopify_cart_id', cleanCartId);
        }
      } catch (error) {
        console.error('Error saving cart ID to localStorage:', error);
      }
      
      this.notifyListeners();
      return this.cart;
    } catch (error) {
      console.error('Error creating cart:', error);
      return null;
    }
  }

  // Get existing cart by ID
  async getCartById(cartId) {
    
    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const result = await fetchShopifyData(query, { cartId });
      return result.cart;
    } catch (error) {
      console.error('Error getting cart from Shopify:', error);
      return null;
    }
  }

  // Add item to cart
  async addToCart(variantId, quantity = 1) {
    if (!this.cartId) {
      await this.initialize();
    }

    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const result = await fetchShopifyData(mutation, {
        cartId: this.fullCartId || this.cartId, // Use full cart ID if available
        lines: [
          {
            merchandiseId: variantId,
            quantity
          }
        ]
      });

      if (result.cartLinesAdd.userErrors.length > 0) {
        throw new Error(result.cartLinesAdd.userErrors[0].message);
      }

      this.cart = result.cartLinesAdd.cart;
      this.fullCartId = this.cart.id; // Update full cart ID
      this.notifyListeners();
      return this.cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Update item quantity
  async updateQuantity(lineId, quantity) {
    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const result = await fetchShopifyData(mutation, {
        cartId: this.fullCartId || this.cartId, // Use full cart ID if available
        lines: [
          {
            id: lineId,
            quantity
          }
        ]
      });

      if (result.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(result.cartLinesUpdate.userErrors[0].message);
      }

      this.cart = result.cartLinesUpdate.cart;
      this.fullCartId = this.cart.id; // Update full cart ID
      this.notifyListeners();
      return this.cart;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  }

  // Remove item from cart
  async removeFromCart(lineId) {
    const mutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const result = await fetchShopifyData(mutation, {
        cartId: this.fullCartId || this.cartId, // Use full cart ID if available
        lineIds: [lineId]
      });

      if (result.cartLinesRemove.userErrors.length > 0) {
        throw new Error(result.cartLinesRemove.userErrors[0].message);
      }

      this.cart = result.cartLinesRemove.cart;
      this.fullCartId = this.cart.id; // Update full cart ID
      this.notifyListeners();
      return this.cart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // Get current cart
  getCart() {
    return this.cart;
  }

  // Get cart ID
  getCartId() {
    return this.cartId;
  }

  // Subscribe to cart changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify listeners of cart changes
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.cart));
  }

  // Clear cart
  async clearCart() {
    if (this.cartId) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('shopify_cart_id');
        }
      } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
      }
      this.cartId = null;
      this.cart = null;
      this.notifyListeners();
    }
  }
}

// Create singleton instance
const cartManager = new ShopifyCartManager();

export default cartManager; 