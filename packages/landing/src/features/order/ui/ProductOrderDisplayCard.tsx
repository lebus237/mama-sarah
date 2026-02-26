import { Product } from '@/entities/product'
import Image from 'next/image'

export const ProductOrderDisplayCard = ({ product }: { product: Product }) => {
   return (
      <div className="xl:p-3 w-full xl:h-32 grid xl:grid-cols-5 border border-gray-200 rounded-xl">
         <aside className="xl:col-span-2 h-full">
            <figure className="w-full h-full relative">
               <Image
                  src="/images/product/image.webp"
                  alt="thumbnail"
                  fill
                  className="object-cover"
               />
            </figure>
         </aside>
         <aside>
            <h5 className="text-lg font-bold">{product.designation}</h5>
         </aside>
      </div>
   )
}
