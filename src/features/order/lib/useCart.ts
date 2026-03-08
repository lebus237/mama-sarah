import { useCartStore } from './cartStore'
import type { Preference } from '../model/order_item'

export function useCart() {
   const { cart, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getDetailedItems, getSubtotal } =
      useCartStore()

   return {
      cart,
      items: cart.items,
      detailedItems: getDetailedItems(),
      subtotal: getSubtotal(),
      totalItems: getTotalItems(),
      addItem,
      removeItem: (productId: string, preferences: Preference[] = []) => removeItem(productId, preferences),
      updateQuantity,
      clearCart,
   }
}
