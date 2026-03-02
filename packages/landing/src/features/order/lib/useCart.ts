'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Cart, CartItem } from '@/entities/cart'
import { productList, type Product } from '@/entities/product'

const LOCAL_STORAGE_KEY = 'mama-sarah-cart'

const INITIAL_CART: Cart = {
   id: 'local-cart',
   items: [],
}

const loadInitialCart = (): Cart => {
   if (typeof window === 'undefined') return INITIAL_CART

   try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!raw) return INITIAL_CART

      const parsed = JSON.parse(raw) as Cart
      if (!parsed || !Array.isArray(parsed.items)) return INITIAL_CART
      return parsed
   } catch {
      return INITIAL_CART
   }
}

export function useCart() {
   const [cart, setCart] = useState<Cart>(loadInitialCart)

   useEffect(() => {
      try {
         window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
      } catch {
         // ignore persistence errors
      }
   }, [cart])

   const addItem = useCallback((productId: string, quantity: number = 1) => {
      setCart(prev => {
         const existing = prev.items.find(item => item.productId === productId)

         let items: CartItem[]
         if (existing) {
            items = prev.items.map(item =>
               item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
            )
         } else {
            items = [...prev.items, { productId, quantity }]
         }

         return { ...prev, items }
      })
   }, [])

   const removeItem = useCallback((productId: string) => {
      setCart(prev => ({
         ...prev,
         items: prev.items.filter(item => item.productId !== productId),
      }))
   }, [])

   const updateQuantity = useCallback((productId: string, quantity: number) => {
      setCart(prev => ({
         ...prev,
         items: prev.items.map(item => (item.productId === productId ? { ...item, quantity } : item)),
      }))
   }, [])

   const clearCart = useCallback(() => {
      setCart(prev => ({ ...prev, items: [] }))
   }, [])

   const totalItems = useMemo(
      () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
      [cart.items],
   )

   const detailedItems = useMemo(
      () =>
         cart.items
            .map(item => {
               const product = productList.find(p => p.id === item.productId)
               if (!product) return null

               return {
                  product,
                  quantity: item.quantity,
                  lineTotal: Number(product.price) * item.quantity,
               }
            })
            .filter((value): value is { product: Product; quantity: number; lineTotal: number } => value !== null),
      [cart.items],
   )

   const subtotal = useMemo(
      () => detailedItems.reduce((sum, item) => sum + item.lineTotal, 0),
      [detailedItems],
   )

   return {
      cart,
      items: cart.items,
      detailedItems,
      subtotal,
      totalItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
   }
}
