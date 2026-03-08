'use client'

import { getProductsByCategory, ProductCategory, productCategoryList } from '@/entities/product'
import { cn } from '@/shared/lib/styles'
import { useEffect, useRef, useState } from 'react'
import { CartSummary, useCart } from '@/features/order'
import { useScroll } from 'motion/react'
import { ProductItemOrderCard } from './components/ProductItemOrderCard'
import { Fade } from 'react-awesome-reveal'
import { Link, Element } from 'react-scroll'

export function OrderPage() {
   const { scrollY } = useScroll()
   const { addItem } = useCart()
   const [hasFired, setHasFired] = useState(false)
   const navigationRef = useRef<HTMLDivElement | null>(null)
   const cart = useCart()

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
               <nav className="xl:w-3/5 xl:h-16 flex justify-between items-center order-category-navigation">
                  {productCategoryList.map(section => (
                     <Link
                        key={section.id}
                        to={section.id}
                        spy={true}
                        offset={-256}
                        duration={500}
                        smooth={true}
                        className="block h-full content-center basis-1/5 text-center transition-border ease-linear  uppercase"
                        activeClass={cn('active border-b-3 border-primary font-bold text-primary')}>
                        {section.designation}
                     </Link>
                  ))}
               </nav>
               <div className="xl:w-1/5"></div>
            </div>
         </div>
         <div className="container grid xl:grid-cols-3 gap-6 xl:py-12">
            <aside
               className={cn('xl:col-span-full xl:space-y-12', {
                  'xl:col-span-2': cart.totalItems > 0,
               })}>
               {productCategoryList.map((category: ProductCategory) => {
                  const productItems = getProductsByCategory(category.id)
                  return (
                     <Element key={category.id} name={category.id}>
                        <h2 className="xl:text-xl font-bold font-plus-jakarta text-secondary">
                           {category.designation}
                        </h2>
                        <div
                           className={cn('grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4', {
                              'xl:grid-cols-2': cart.totalItems > 0,
                           })}>
                           {productItems.map((product, _index) => (
                              <Fade delay={_index * 0.5} triggerOnce key={product.id}>
                                 <ProductItemOrderCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addItem}
                                 />
                              </Fade>
                           ))}
                        </div>
                     </Element>
                  )
               })}
            </aside>
            <aside className="hidden xl:block">{cart.totalItems > 0 && <CartSummary />}</aside>
         </div>
      </div>
   )
}
