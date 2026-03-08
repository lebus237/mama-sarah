'use client'

import { Product } from '@/entities/product'
import { AddToCartModal } from '@/features/order'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'

type ProductOrderDisplayCardProps = {
   product: Product
   onAddToCart: (productId: string, qty: number, preferences: string[]) => void
}

export const ProductItemOrderCard = ({ product, onAddToCart }: ProductOrderDisplayCardProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const data = useSWR<{ image: string }>(
      `image-${product.id}`,
      async () =>
         await fetch('https://foodish-api.com/api')
            .then(res => res.json())
            .catch(() => null),
   )

   const handleConfirm = (productId: string, quantity: number, preferences: string[]) => {
      onAddToCart(productId, quantity, preferences)
   }

   //TODO: Remove the placeholder imageUrl sent to the modal on addToCart
   return (
      <>
         <div
            className="cursor-pointer w-full h-40 xl:h-36 grid grid-cols-2 xl:grid-cols-7
             max-md:border-b-2 border-gray-200  rounded-xl md:shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:scale-105 transition-all duration-200"
            onClick={() => setIsModalOpen(true)}>
            <aside className="flex flex-col  justify-between xl:col-span-5 p-3">
               <section className="space-y-2">
                  <h5 className="xl:text-xl font-bold line-clamp-2 capitalize font-cabin">
                     {product.designation}
                  </h5>
                  <p className="text-foreground/90 lg:leading-[120%]">
                     {_.truncate(product.description, { length: 70 })}
                  </p>
               </section>
               <section className="flex md:justify-end ">
                  <PriceDisplay
                     amount={parseFloat(product.price.toString())}
                     className="text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide"
                  />
               </section>
            </aside>
            <aside className="xl:col-span-2 flex items-center border-l border-gray-50 border-dashed">
               <figure className="relative w-full h-28 md:h-full max-md:border-2 max-md:border-gray-200 rounded-md">
                  <Image
                     src={data.data?.image ?? '/empty'}
                     alt="thumbnail"
                     fill
                     className="object-cover rounded-tr-xl rounded-br-xl "
                  />
                  <div
                     className="rounded-full text-secondary bg-white w-10 h-10 absolute bottom-1.5 right-1.5 flex items-center justify-center shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
                     onClick={e => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                     }}>
                     <PlusIcon />
                  </div>
               </figure>
            </aside>
         </div>

         <AddToCartModal
            product={{ ...product, imageUrl: data.data?.image ?? '' }}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onConfirm={handleConfirm}
         />
      </>
   )
}
