'use client'

import { CustomIcon } from '@/shared/ui/icons'
import { useCart } from '../lib/useCart'
import { Fragment, useState } from 'react'
import { Dialog, DialogContent } from '@/shared/ui/common'
import { CartSummaryDisplay } from './CartSummaryDisplay'

export const MobileOrderCounterDisplay = () => {
   const cart = useCart()
   const [open, setOpen] = useState(false)
   const onOpenChange = () => setOpen(!open)

   return (
      <Fragment>
         <button
            onClick={onOpenChange}
            className="cursor-pointer w-full h-full font-poppins bg-tertiary rounded-full text-white flex items-center justify-center gap-x-1.5">
            <CustomIcon type="food-cart" size={30} />
            <span className="text-2xl">{cart.totalItems}</span>
         </button>
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="py-12">
               <div className="h-full  container overflow-y-auto">
                  <CartSummaryDisplay canCheckout />
               </div>
            </DialogContent>
         </Dialog>
      </Fragment>
   )
}
