import { productList, type Product } from '@/entities/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
   productId: string
   quantity: number
   preferences: string[]
}

export type Cart = {
   id: string
   items: CartItem[]
}

export type DetailedCartItem = {
   product: Product
   quantity: number
   lineTotal: number
   preferences: string[]
}

type CartState = {
   cart: Cart
   addItem: (productId: string, quantity?: number, preferences?: string[]) => void
   removeItem: (productId: string, preferences?: string[]) => void
   updateQuantity: (productId: string, quantity: number) => void
   clearCart: () => void
   getTotalItems: () => number
   getDetailedItems: () => DetailedCartItem[]
   getSubtotal: () => number
}

const INITIAL_CART: Cart = {
   id: 'local-cart',
   items: [],
}

export const useCartStore = create<CartState>()(
   persist(
      (set, get) => ({
         cart: INITIAL_CART,

         addItem: (productId: string, quantity: number = 1, preferences: string[] = []) => {
            set(state => {
               const existing = state.cart.items.find(
                  item =>
                     item.productId === productId &&
                     JSON.stringify(item.preferences) === JSON.stringify(preferences),
               )

               let items: CartItem[]
               if (existing) {
                  items = state.cart.items.map(item =>
                     item.productId === productId &&
                     JSON.stringify(item.preferences) === JSON.stringify(preferences)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                  )
               } else {
                  items = [...state.cart.items, { productId, quantity, preferences }]
               }

               return {
                  cart: { ...state.cart, items },
               }
            })
         },

         removeItem: (productId: string, preferences: string[] = []) => {
            set(state => ({
               cart: {
                  ...state.cart,
                  items: state.cart.items.filter(
                     item =>
                        !(
                           item.productId === productId &&
                           JSON.stringify(item.preferences) === JSON.stringify(preferences)
                        ),
                  ),
               },
            }))
         },

         updateQuantity: (productId: string, quantity: number) => {
            set(state => ({
               cart: {
                  ...state.cart,
                  items: state.cart.items.map(item =>
                     item.productId === productId ? { ...item, quantity } : item,
                  ),
               },
            }))
         },

         clearCart: () => {
            set(state => ({
               cart: { ...state.cart, items: [] },
            }))
         },

         getTotalItems: () => {
            return get().cart.items.reduce((sum, item) => sum + item.quantity, 0)
         },

         getDetailedItems: () => {
            return get()
               .cart.items.map(item => {
                  const product = productList.find(p => p.id === item.productId)
                  if (!product) return null

                  return {
                     product,
                     quantity: item.quantity,
                     lineTotal: Number(product.price) * item.quantity,
                     preferences: item.preferences,
                  }
               })
               .filter((value): value is DetailedCartItem => value !== null)
         },

         getSubtotal: () => {
            return get()
               .getDetailedItems()
               .reduce((sum, item) => sum + item.lineTotal, 0)
         },
      }),
      {
         name: 'mama-sarah-cart',
         partialize: state => ({ cart: state.cart }),
      },
   ),
)
