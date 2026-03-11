import { useCartStore } from './cartStore'

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
      removeItem: (productId: string, preferences: string[] = []) => removeItem(productId, preferences),
      updateQuantity,
      clearCart,
   }
}
