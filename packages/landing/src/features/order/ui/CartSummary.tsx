import { I18nLabel } from '@shared/i18n'
import { PinIcon } from 'lucide-react'
import { useCart } from '../lib/useCart'

export const CartSummary = () => {
   const { detailedItems, subtotal, totalItems, clearCart } = useCart()

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
                  {detailedItems.map(item => (
                     <li key={item.product.id} className="py-2 flex items-center justify-between">
                        <div>
                           <p className="text-sm font-medium line-clamp-2">
                              {item.product.designation}
                           </p>
                           <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">{item.lineTotal}</p>
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
