'use client'

import { getProductsByCategory, productCategoryList } from '@/entities/product'
import Link from 'next/link'
import { cn } from '@/shared/lib/styles'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ProductOrderDisplayCard, CartSummary, useCart } from '@/features/order'
import { useScroll } from 'motion/react'

export function OrderPage() {
   const [hash, setHash] = useState<string>()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const { scrollY } = useScroll()
   const { addItem } = useCart()
   const [hasFired, setHasFired] = useState(false)
   const navigationRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const handleHashChange = () => {
         setHash(window.location.hash)
      }
      handleHashChange()
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
   }, [pathname, searchParams])

   useEffect(() => {
      return scrollY.on('change', latestValue => {
         if (latestValue > 560 && !hasFired) {
            if (navigationRef.current !== null) {
               navigationRef.current.style =
                  'position: fixed;left: 0;top: 80px;width: 100%;z-index: 1000;border-top: 1px solid #e5e7eb;'
            }
            setHasFired(true)
         }
         if (latestValue < 560 && hasFired) {
            if (navigationRef.current !== null) {
               navigationRef.current.style = ''
            }
            setHasFired(false)
         }
      })
   }, [scrollY, hasFired])

   return (
      <div className="">
         <div className="border-gray-200 bg-white border-b" ref={navigationRef}>
            <div className="container flex justify-center">
               <nav className="xl:w-3/5 xl:h-16 flex justify-between items-center">
                  {productCategoryList.map((category, index) => (
                     <Link
                        href={`#${category.id}`}
                        className={cn(
                           'block h-full content-center basis-1/5 text-center transition-border ease-in-out  uppercase',
                           {
                              'border-b-2 border-primary font-bold text-primary':
                                 category.id === hash?.slice(1) || (hash === '' && index === 0),
                           },
                        )}>
                        {category.designation}
                     </Link>
                  ))}
               </nav>
               <div className="xl:w-1/5"></div>
            </div>
         </div>
         <div className="container grid xl:grid-cols-3 gap-6 py-6">
            <aside className="xl:col-span-2">
               {productCategoryList.map((category, index) => {
                  const productItems = getProductsByCategory(category.id)
                  return (
                     <div id={category.id} key={index}>
                        <h2 className="text-2xl font-bold">{category.designation}</h2>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
                           {productItems.map(product => (
                              <ProductOrderDisplayCard
                                 key={product.id}
                                 product={product}
                                 onAddToCart={addItem}
                              />
                           ))}
                        </div>
                     </div>
                  )
               })}
            </aside>
            <aside className="hidden xl:block">
               <CartSummary />
            </aside>
         </div>
      </div>
   )
}
