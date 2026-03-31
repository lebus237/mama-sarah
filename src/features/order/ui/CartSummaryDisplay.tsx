import { I18nLabel } from '@/shared/i18n'
import { routePaths } from '@/shared/routes'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { PinIcon, ShoppingCart, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../lib/useCart'
import Image from 'next/image'

export const CartSummaryDisplay = ({
   canCheckout,
   onClose,
}: {
   canCheckout?: boolean
   onClose?: any
}) => {
   const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()

   return (
      <section className="md:border border-gray-200 rounded-2xl bg-white  shadow-xl transition-shadow  h-full md:h-fit flex flex-col justify-start">
         <div className="md:p-4">
            <header className="space-y-3 border-b border-gray-200 border-dashed">
               <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl text-secondary md:text-lg font-semibold">
                     <I18nLabel label="checkout.summary" />
                     <p className="text-sm text-gray-400">
                        <I18nLabel label="pret.pour.la.commande" />
                     </p>
                  </h2>
                  <span
                     className="md:text-sm text-gray-200
              size-10 flex items-center justify-center
               rounded-full bg-gray-200">
                     <ShoppingCart size={20} className="font-bold text-black hidden md:block" />
                  </span>
               </div>
            </header>

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
                           <div className="space-x-5 flex ">
                              <Image
                                 src={item.product.imageUrl}
                                 alt="thumbnail"
                                 width={200}
                                 height={100}
                                 className="w-20 h-20 object-cover rounded-md"
                              />

                              <div className="space-y-6">
                                 <p className="text-md font-semibold line-clamp-2 font-plus-jakarta leading-[110%] text-secondary">
                                    {_.upperFirst(item.product.designation.toLowerCase())}
                                 </p>

                                 <div
                                    className="bg-tertiary w-10
                           rounded-full flex justify-center items-center py-1 px-3">
                                    <p className="text-xl md:text-base ">
                                       <span className="text-white">x{item.quantity}</span>
                                       {(item.preferences ?? []).length > 0 && (
                                          <span className="ml-1 text-gray-400">
                                             ({item.preferences.join(', ')})
                                          </span>
                                       )}
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="ml-auto flex flex-col items-end gap-4 space-y-6">
                              <div className="rounded-full w-7 h-7 border-primary hover:border flex justify-center items-center py-2">
                                 <X
                                    className=" text-gray-400
                              hover:cursor-pointer
                               hover:text-primary"
                                    onClick={() => removeItem(item.product.id, item.preferences)}
                                    size={17}
                                 />
                              </div>
                              <PriceDisplay
                                 amount={item.lineTotal}
                                 showSymbol={false}
                                 className="md:font-cabin text-xl md:text-lg md:font-semibold font-bebas text-secondary "
                                 locale="en-US"
                              />

                              {/*  */}
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
         <div className="flex flex-col bg-gray-100 px-4 rounded-b-2xl">
            <div className="flex items-center justify-between border-t border-gray-200 border-dashed pt-4 mb-3 ">
               <span className="text-xl text-gray-600 md:text-lg font-semibold">
                  <I18nLabel label="checkout.total" />
               </span>
               <PriceDisplay
                  amount={subtotal}
                  className="font-semibold lg:font-medium font-bebas text-[1.625rem] tracking-wide md:text-2xl text-tertiary"
               />
            </div>
            <div className="flex justify-between gap-2 mt-6 justify-self-end  my-4">
               {canCheckout && totalItems > 0 && (
                  <Link href={routePaths.CHECKOUT} className="block w-1/2">
                     <button
                        onClick={onClose}
                        disabled={totalItems === 0}
                        type="button"
                        className="flex-1 w-full disabled:bg-gray-300
                    inline-flex text-lg items-center font-medium justify-center
                    rounded-full py-3 border-tertiary border
                     hover:opacity-90 bg-tertiary text-white cursor-pointer">
                        <I18nLabel label="checkout.proceed" />
                     </button>
                  </Link>
               )}
               {totalItems > 0 && (
                  <button
                     type="button"
                     className="inline-flex w-1/2 items-center justify-center
                  rounded-full border-2   border-primary
                   md:text-lg py-3 font-medium
                 bg-primary text-white cursor-pointer"
                     onClick={clearCart}>
                     <I18nLabel label="checkout.clearCart" />
                  </button>
               )}
            </div>
         </div>
      </section>
   )
}
