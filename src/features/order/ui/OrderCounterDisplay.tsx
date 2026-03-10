'use client'

import { routePaths } from '@/shared/routes'
import { CustomIcon } from '@/shared/ui/icons'
import Link from 'next/link'
import { useCart } from '../lib/useCart'

export const OrderCounterDisplay = () => {
   const cart = useCart()
   return (
      <Link href={routePaths.CHECKOUT} className="mr-40">
         <button className="cursor-pointer xl:w-20 xl:h-12 font-poppins bg-primary rounded-full text-white flex items-center justify-center gap-x-1.5">
            <CustomIcon type="food-cart" size={24} />
            <span className="text-lg">{cart.totalItems}</span>
         </button>
      </Link>
   )
}
