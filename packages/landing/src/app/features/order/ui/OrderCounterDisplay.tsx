'use client'

import { CustomIcon } from '@shared/core'

export const OrderCounterDisplay = () => {
   return (
      <button className="cursor-pointer xl:w-20 xl:h-12 font-poppins bg-primary rounded-full text-white flex items-center justify-center gap-x-1.5">
         <CustomIcon type="food-cart" size={24} />
         <span className="text-lg">2</span>
      </button>
   )
}
