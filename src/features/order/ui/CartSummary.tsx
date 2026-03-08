import { I18nLabel } from '@/shared/i18n'
import { PinIcon, Trash2 } from 'lucide-react'
import { useCart } from '../lib/useCart'

export const CartSummary = () => {
   const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()

   return (
      <section className="border border-gray-200 rounded-2xl bg-white p-4 shadow-sm">
         <header className="space-y-3">
            <div className="flex justify-end border-b border-gray-100 border-dashed pb-3">
               <PinIcon size={20} className="rotate-45 text-gray-500" />
            </div>
            <div className="flex items-center justify-between mb-3">
               <h2 className="text-lg font-semibold">
                  <I18nLabel label="checkout.summary" />
               </h2>
               <span className="text-sm text-gray-500">{totalItems} items</span>
            </div>
         </header>

         {totalItems === 0 ? (
            <p className="text-sm text-gray-500">
               <I18nLabel label="checkout.emptyCart" />
            </p>
         ) : (
            <>
               <ul className="divide-y divide-gray-100 mb-4">
                  {detailedItems.map((item, index) => (
                     <li key={`${item.product.id}-${index}`} className="py-2 flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium line-clamp-2">
                              {item.product.designation}
                           </p>
                           <p className="text-xs text-gray-500">
                              x{item.quantity}
                              {(item.preferences ?? []).length > 0 && (
                                 <span className="ml-1">({item.preferences.join(', ')})</span>
                              )}
                           </p>
                        </div>
                        <div className="flex items-center gap-2">
                           <p className="text-sm font-semibold">{item.lineTotal}</p>
                           <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.preferences)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </li>
                  ))}
               </ul>

               <div className="flex items-center justify-between border-t border-gray-100 pt-3 mb-3">
                  <span className="text-sm text-gray-600">
                     <I18nLabel label="checkout.subtotal" />
                  </span>
                  <span className="text-base font-bold">{subtotal}</span>
               </div>

               <div className="flex gap-2">
                  <button
                     type="button"
                     className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                     <I18nLabel label="checkout.proceed" />
                  </button>
                  <button
                     type="button"
                     className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                     onClick={clearCart}>
                     <I18nLabel label="checkout.clearCart" />
                  </button>
               </div>
            </>
         )}
      </section>
   )
}
