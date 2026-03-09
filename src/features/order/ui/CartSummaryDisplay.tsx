import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import { routePaths } from '@/shared/routes'
import { PriceDisplay } from '@/shared/ui/common'
import { PinIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../lib/useCart'

export const CartSummaryDisplay = () => {
   const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()

   return (
      <section className="border border-gray-200 rounded-2xl bg-white p-4 shadow-xs">
         <header className="space-y-3 border-b border-gray-200 border-dashed">
            <div className="flex justify-end">
               <PinIcon size={18} className="rotate-45 text-gray-400" />
            </div>
            <div className="flex items-center justify-between mb-3">
               <h2 className="text-lg font-semibold">
                  <I18nLabel label="checkout.summary" />
               </h2>
               <span className="text-sm text-gray-500">
                  {totalItems} <I18nLabel label="text.items" />
               </span>
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
                     <li
                        key={`${item.product.id}-${index}`}
                        className="py-2 flex items-center justify-between gap-2">
                        <div className={cn('space-y-1.5 w-auto')}>
                           <p className="text-sm font-medium line-clamp-2">
                              {item.product.designation}
                           </p>
                           <p className="text-xs">
                              <span className="text-tertiary">x{item.quantity}</span>
                              {(item.preferences ?? []).length > 0 && (
                                 <span className="ml-1 text-gray-400">
                                    ({item.preferences.join(', ')})
                                 </span>
                              )}
                           </p>
                        </div>
                        <div className="space-y-3">
                           <PriceDisplay
                              amount={item.lineTotal}
                              showSymbol={false}
                              className="font-cabin text-sm font-semibold"
                              locale="en-US"
                           />
                           <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.preferences)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex justify-end w-full"
                              aria-label="Remove item">
                              <Trash2 size={18} />
                           </button>
                        </div>
                     </li>
                  ))}
               </ul>

               <div className="flex items-center justify-between border-t border-gray-200 border-dashed pt-4 mb-3">
                  <span className="text-sm text-gray-600">
                     <I18nLabel label="checkout.cartTotal" />
                  </span>
                  <PriceDisplay amount={subtotal} className="font-semibold" />
               </div>

               <div className="flex justify-between gap-2 mt-6">
                  <Link href={routePaths.CHECKOUT}>
                     <button
                        type="button"
                        className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white text-base font-semibold hover:bg-primary/90">
                        <I18nLabel label="checkout.proceed" />
                     </button>
                  </Link>
                  <button
                     type="button"
                     className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                     onClick={clearCart}>
                     <I18nLabel label="checkout.clearCart" />
                  </button>
               </div>
            </>
         )}
      </section>
   )
}
