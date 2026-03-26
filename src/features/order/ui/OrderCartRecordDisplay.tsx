import { I18nLabel } from '@/shared/i18n'
import { routePaths } from '@/shared/routes'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { PinIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../lib/useCart'

export const OrderCartRecordDisplay = ({
   canCheckout,
   onClose,
}: {
   canCheckout?: boolean
   onClose?: any
}) => {
   const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()

   return (
      <section className="md:border border-gray-200 rounded-2xl bg-white md:p-4 md:shadow-xs  h-full md:h-fit flex flex-col justify-start">
         <header className="space-y-3 border-b border-gray-200 border-dashed"></header>

         {totalItems === 0 ? (
            <p className=" text-gray-500 h-48 content-center text-center">
               <I18nLabel label="checkout.emptyCart" />
            </p>
         ) : (
            <div>
               <ul className="md:divide-y md:divide-gray-100 py-6 md:py-3">
                  {detailedItems.map((item, index) => (
                     <li
                        key={`${item.product.id}-${index}`}
                        className="py-3 md:py-2 flex items-center justify-between">
                        <div className="space-y-1.5">
                           <p className="text-lg font-semibold line-clamp-2 font-plus-jakarta leading-[110%] text-secondary">
                              {_.upperFirst(item.product.designation.toLowerCase())}
                           </p>
                           <p className="text-lg md:text-base">
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
                              className="md:font-cabin text-xl md:text-sm md:font-semibold font-bebas text-secondary "
                              locale="en-US"
                           />
                           <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.preferences)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex justify-end w-full"
                              aria-label="Remove item">
                              <Trash2 className="w-5 h-5" />
                           </button>
                        </div>
                     </li>
                  ))}
               </ul>

               <div className="flex items-center justify-between border-t border-gray-200 border-dashed pt-4 mb-3">
                  <span className="text-xl text-gray-600 md:text-lg font-semibold">
                     <I18nLabel label="checkout.total" />
                  </span>
                  <PriceDisplay
                     amount={subtotal}
                     className="font-semibold lg:font-medium font-bebas text-[1.625rem] tracking-wide md:text-2xl text-tertiary"
                  />
               </div>
            </div>
         )}
         <div className="flex justify-between md:gap-2 mt-6 justify-self-end py-12 md:py-0">
            {canCheckout && totalItems > 0 && (
               <Link href={routePaths.CHECKOUT}>
                  <button
                     onClick={onClose}
                     disabled={totalItems === 0}
                     type="button"
                     className="flex-1 disabled:bg-gray-300 inline-flex text-lg items-center justify-center rounded-full bg-tertiary md:bg-primary px-6 py-3.5 text-white font-normal hover:opacity-90">
                     <I18nLabel label="checkout.proceed" />
                  </button>
               </Link>
            )}
            {totalItems > 0 && (
               <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 md:text-lg font-medium text-gray-600 hover:bg-gray-50"
                  onClick={clearCart}>
                  <span className="hidden md:block">
                     <I18nLabel label="checkout.clearCart" />
                  </span>
                {/* <Trash2 size={18} className="md:hidden" /> */}
               </button>
            )}
         </div>
      </section>
   )
}
