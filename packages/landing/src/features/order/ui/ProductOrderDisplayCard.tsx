import { Product } from '@/entities/product'
import Image from 'next/image'

type ProductOrderDisplayCardProps = {
   product: Product
   onAddToCart?: (productId: string) => void
}

export const ProductOrderDisplayCard = ({ product, onAddToCart }: ProductOrderDisplayCardProps) => {
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
         <aside className="flex px-3 py-2 xl:py-0">
            <h5 className="text-lg font-bold line-clamp-2">{product.designation}</h5>
            {/*{onAddToCart && (*/}
            {/*   <button*/}
            {/*      type="button"*/}
            {/*      className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white hover:bg-primary/90"*/}
            {/*      onClick={() => onAddToCart(product.id)}>*/}
            {/*      Ajouter au panier*/}
            {/*   </button>*/}
            {/*)}*/}
         </aside>
      </div>
   )
}
