'use client'

import { Product } from '@/entities/product'
import { useState } from 'react'
import { ProductDetailsModal } from './modal/ProductDetailsModal'
import HeroSection from './sections/HeroSection'

export function HomePage() {
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <div className="h-full">
         <section className="h-full">
            <HeroSection />
         </section>

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
