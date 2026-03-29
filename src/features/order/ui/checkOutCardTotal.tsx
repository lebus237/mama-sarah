import { I18nLabel } from '@/shared/i18n'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../lib/useCart'
import { MdLock } from 'react-icons/md'

export const CheckOutCardTotal = ({
   canCheckout,
   onClose,
}: {
   canCheckout?: boolean
   onClose?: any
}) => {
   const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()
   // handling whatsapt message
   const handleWhatsAppOrder = () => {
      if (totalItems === 0) return

      const items = detailedItems
         .map(
            item =>
               `- ${item.quantity}x ${item.product.designation}${
                  item.preferences?.length ? ` (${item.preferences.join(', ')})` : ''
               }`,
         )
         .join('\n')

      const total = subtotal + 2500

      const message = encodeURIComponent(
         ` Nouvelle commande\n\n${items}\n\nSous-total: ${subtotal} FCFA\n Livraison: 2500 FCFA\n Total: ${total} FCFA`,
      )

      window.open(`https://wa.me/237654779815?text=${message}`, '_blank')
   }

   return (
      <section className="md:border border-gray-200 rounded-2xl shadow-xl bg-white p-3 md:p-4 md:shadow-xl  h-full md:h-fit flex flex-col justify-start">
         <header className="space-y-3 border-b border-gray-200 border-dashed">
            <I18nLabel label="text.total.des.commandes" />
         </header>

         {totalItems === 0 ? (
            <p className=" text-gray-500 h-48 content-center text-center">
               <I18nLabel label="checkout.emptyCart" />
            </p>
         ) : (
            <div>
               <div className="border-b border-dashed border-gray-200">
                  <div className="flex items-center justify-between  pt-4 mb-3">
                     <span className="text-xl text-gray-600 md:text-lg font-semibold">
                        <I18nLabel label="text.sous-total" />
                     </span>
                     <PriceDisplay
                        amount={subtotal}
                        className="font-semibold lg:font-medium font-bebas text-[1.625rem] tracking-wide md:text-2xl text-tertiary"
                     />
                  </div>
                  <div className="flex items-center justify-between  pt-4 mb-3">
                     <span className="text-xl text-gray-600 md:text-lg font-semibold">
                        <I18nLabel label="text.frais.livraison" />
                     </span>
                     <PriceDisplay
                        amount={2500}
                        className="font-semibold lg:font-medium font-bebas text-[1.625rem] tracking-wide md:text-2xl text-tertiary"
                     />
                  </div>
               </div>
               <div className="flex items-center justify-between  pt-4 mb-3">
                  <span className="text-xl text-gray-600 md:text-lg font-semibold">
                     <I18nLabel label="checkout.total" />
                  </span>
                  <PriceDisplay
                     amount={subtotal + 2500}
                     className="font-semibold lg:font-medium font-bebas text-[1.625rem] tracking-wide md:text-3xl text-primary"
                  />
               </div>
            </div>
         )}
         <div className="flex flex-col space-y-2 justify-between md:gap-2 mt-6 justify-self-end py-12 md:py-0 px-4">
            <div className="flex flex-col space-y-3 mt-6 px-2 md:px-4">
               <button
                  type="button"
                  className="w-full inline-flex items-center justify-center
  rounded-full
  bg-[#25D366] hover:bg-[#1ebe5d]
  text-white
  text-sm md:text-lg font-semibold
  shadow-md md:shadow-lg shadow-[#25D366]/30
  py-3 md:py-5 px-4 transition cursor-pointer"
                  onClick={handleWhatsAppOrder}>
                  <FaWhatsapp size={20} className="mr-2 md:mr-3" />
                  <I18nLabel label="action.commande.whatsapp" />
               </button>

               <button
                  type="button"
                  className="w-full inline-flex items-center justify-center
    rounded-full border-2 border-gray-200
    text-sm md:text-lg font-semibold
    shadow-md md:shadow-lg
    text-gray-500
    py-3 md:py-5 px-4 transition hover:bg-gray-50">
                  <I18nLabel label="action.payer.maintenant" />
               </button>
            </div>
            {/* Security Info */}
            <div className="flex items-center justify-center my-3 text-gray-400 text-xs md:text-sm text-center px-2">
               <MdLock className="mr-2" size={16} />
               <I18nLabel label="text.payement.100%.securise.et.encrypte" />
            </div>
         </div>
      </section>
   )
}
