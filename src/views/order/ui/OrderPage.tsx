'use client'

import {
   getProductsByCategory,
   Product,
   ProductCategory,
   productCategoryList,
} from '@/entities/product'
import { AddToCartModal, CartSummaryDisplay, useCart } from '@/features/order'
import { cn } from '@/shared/lib/styles'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { PlusIcon } from 'lucide-react'
import { useScroll } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { Element, Link } from 'react-scroll'

export function OrderPage() {
   const { scrollY } = useScroll()
   const [hasFired, setHasFired] = useState(false)
   const navigationRef = useRef<HTMLDivElement | null>(null)
   const cart = useCart()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [product, setProduct] = useState<Product | undefined>()

   const openModal = (item: Product) => {
      setProduct(item)
      setIsModalOpen(true)
   }

   const handleConfirm = (productId: string, quantity: number, preferences: string[]) => {
      cart.addItem(productId, quantity, preferences)
   }

   useEffect(() => {
      return scrollY.on('change', latestValue => {
         if (latestValue > 560 && !hasFired) {
            if (navigationRef.current !== null) {
               navigationRef.current.style =
                  'position: fixed;left: 0;top: 80px;width: 100%;z-index: 20;border-top: 1px solid #e5e7eb;'
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
                              <Fade delay={200} triggerOnce key={product.id}>
                                 <div
                                    className="cursor-pointer w-full h-40 xl:h-36 grid grid-cols-2 xl:grid-cols-7
                                              max-md:border-b-2 border-gray-200  rounded-xl md:shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:scale-105 transition-all duration-200"
                                    onClick={() => openModal(product)}>
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
                                             src={product.imageUrl}
                                             alt="thumbnail"
                                             fill
                                             className="object-cover rounded-tr-xl rounded-br-xl "
                                          />
                                          <div
                                             className="rounded-full text-secondary bg-white w-10 h-10 absolute bottom-1.5 right-1.5 flex items-center justify-center shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
                                             onClick={e => {
                                                e.stopPropagation()
                                                openModal(product)
                                             }}>
                                             <PlusIcon />
                                          </div>
                                       </figure>
                                    </aside>
                                 </div>
                              </Fade>
                           ))}
                        </div>
                     </Element>
                  )
               })}
            </aside>
            <aside className="hidden xl:flex justify-end">
               <div className="xl:w-5/6">
                  {cart.totalItems > 0 && <CartSummaryDisplay canCheckout />}
               </div>
            </aside>
         </div>
         {product && (
            <AddToCartModal
               product={product}
               open={isModalOpen}
               onOpenChange={setIsModalOpen}
               onConfirm={handleConfirm}
            />
         )}
      </div>
   )
}
