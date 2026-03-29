import { I18nLabel } from "@/shared/i18n"
import { useCart } from "../lib/useCart"
import { Link, ShoppingCart, X } from "lucide-react"
import { routePaths } from "@/shared/routes"
import { PriceDisplay } from "@/shared/ui/common"
import Image from "next/image"
import _ from "lodash"
const CheckoutResume = ({
   canCheckout,
   onClose,
}: {
   canCheckout?: boolean
   onClose?: any
    }) => {
 const { detailedItems, subtotal, totalItems, clearCart, removeItem } = useCart()
    
    return (  
    <div>
       <section className="md:border border-gray-200 rounded-2xl bg-white  shadow-xl transition-shadow  h-full md:h-fit flex flex-col justify-start">
        <div className='md:p-4'>
         <header className="space-y-3 border-b border-gray-200 border-dashed">
            
            <div className="flex items-center justify-between mb-3">
               <h2 className="text-2xl text-secondary md:text-lg font-semibold">
                  <I18nLabel label="checkout.summary" />
               </h2>
               <span className="text-lg text-gray-600
                rounded-r-full rounded-l-full flex
                w-35 justify-around items-center py-1 px-4 bg-gray-200">
                        <p>{totalItems}</p> 
                        <I18nLabel label="text.article" />
               </span>
            </div>
         </header>

         {totalItems === 0 ? (
            <p className=" text-gray-500 h-48 content-center text-center">
               <I18nLabel label="checkout.emptyCart" />
            </p>
         ) : (
            <div >
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
                              <div className='space-y-6'>
                                <div>
                                 <p className="text-md font-semibold line-clamp-2 font-plus-jakarta leading-[110%] text-secondary">
                                  {_.upperFirst(item.product.designation.toLowerCase())}
                                  </p>
                                  <p className="text-gray-400"> {item.product.description} </p>
                                </div>
                              <div className=' w-50 flex justify-between items-center py-1'>
                                     <div className="text-gray-400">
                                              <I18nLabel label="Quantity: " />
                                              {item.quantity}
                                      </div>
                                      <div className="text-primary text-lg flex space-x-2">
                                       <PriceDisplay
                                         amount={item.lineTotal}
                                         showSymbol={false}
                                         className="md:font-cabin text-xl md:text-lg md:font-semibold font-bebas text-primary "
                                        locale="en-US" />
                                        <span> FCFA</span> 
                                      </div>  
                              </div>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
          )}
          </div>
         
      </section>
    </div>
  )
}

export default CheckoutResume
