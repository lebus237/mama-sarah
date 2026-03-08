'use client'

import { Product } from '@/entities/product'
import { cn } from '@/shared/lib/styles'
import { PriceDisplay } from '@/shared/ui/common'
import Image from 'next/image'
import { useState } from 'react'

import { ProductDetailsModal } from '@/features/order/ui/ProductDetailsModal'

type HomeProductListProps = {
   products: Array<Product>
}

export function HomeProductList({ products }: HomeProductListProps) {
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <div className="container py-8">
         <div className="mb-6">
            <h1 className="text-2xl font-bold font-cabin text-secondary">Menu</h1>
         </div>

         <div className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4')}>
            {products.map(product => (
               <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                     setSelectedProduct(product)
                     setIsModalOpen(true)
                  }}
                  className="text-left bg-white rounded-xl border border-gray-100 shadow-[0px_8px_24px_rgba(149,157,165,0.18)] hover:scale-[1.01] transition-all duration-200 overflow-hidden">
                  <div className="w-full aspect-video relative">
                     <Image src={product.imageUrl} alt={product.designation} fill className="object-cover" />
                  </div>

                  <div className="p-4">
                     <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold font-cabin text-secondary line-clamp-2">{product.designation}</h3>
                        <PriceDisplay
                           amount={Number(product.price)}
                           className="text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide"
                        />
                     </div>

                     {!!product.description && (
                        <p className="mt-2 text-foreground/90 text-sm line-clamp-2">{product.description}</p>
                     )}
                  </div>
               </button>
            ))}
         </div>

         <ProductDetailsModal
            product={selectedProduct}
            open={isModalOpen}
            onOpenChange={open => {
               setIsModalOpen(open)
               if (!open) setSelectedProduct(null)
            }}
         />
      </div>
   )
}
