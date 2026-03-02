import { Product } from '@/entities/product'
import Image from 'next/image'
import { PlusIcon } from 'lucide-react'
import _ from 'lodash'
import { PriceDisplay } from '@/shared/ui/common'
import { useState } from 'react'
import useSWR from 'swr'

type ProductOrderDisplayCardProps = {
   product: Product
   onAddToCart?: (productId: string) => void
}

export const ProductItemOrderCard = ({ product, onAddToCart }: ProductOrderDisplayCardProps) => {
   const data = useSWR<{ image: string }>(
      `image-${product.id}`,
      async () =>
         await fetch('https://foodish-api.com/api')
            .then(res => res.json())
            .catch(() => null),
   )

   return (
      <div className="cursor-pointer w-full xl:h-36 grid xl:grid-cols-7 rounded-xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:scale-105 transition-all duration-200">
         <aside className="flex flex-col  justify-between xl:col-span-5 p-3">
            <section className="space-y-2">
               <h5 className="text-sm font-bold line-clamp-2 uppercase font-plus-jakarta">
                  {product.designation}
               </h5>
               <p className="text-foreground/90 lg:leading-[120%]">
                  {_.truncate(product.description, { length: 70 })}
               </p>
            </section>
            <section className="flex justify-end text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide">
               <PriceDisplay amount={parseFloat(product.price.toString())} />
            </section>
         </aside>
         <aside className="xl:col-span-2 h-full border-l border-gray-50 border-dashed">
            <figure className="w-full h-full relative -mr-0.5">
               <Image
                  src={data.data?.image ?? ''}
                  alt="thumbnail"
                  fill
                  className="object-cover rounded-tr-xl rounded-br-xl"
               />
               <button className="rounded-full text-secondary bg-white w-10 h-10 absolute bottom-1.5 right-1.5 flex items-center justify-center shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
                  <PlusIcon />
               </button>
            </figure>
         </aside>
      </div>
   )
}
