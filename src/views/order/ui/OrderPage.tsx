'use client'

import {
   getProductsByCategory,
   Product,
   ProductCategory,
   productCategoryList,
} from '@/entities/product'
import { AddToCartModal, CartSummaryDisplay, useCart } from '@/features/order'
import { useViewPort } from '@/shared/lib/layout'
import { cn } from '@/shared/lib/styles'
import { PriceDisplay } from '@/shared/ui/common'
import _ from 'lodash'
import { ChevronLeft, ChevronRight, PlusIcon } from 'lucide-react'
import { useScroll } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { Element, Link } from 'react-scroll'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { OrderHeroSection } from './sections/OrderHeroSection'

export function OrderPage() {
   const { scrollY } = useScroll()
   const [hasFired, setHasFired] = useState(false)
   const navigationRef = useRef<HTMLDivElement | null>(null)
   const viewPort = useViewPort()
   const cart = useCart()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [product, setProduct] = useState<Product | undefined>()
   const swiperRef = useRef<SwiperType | null>(null)

   const openModal = (item: Product) => {
      setProduct(item)
      setIsModalOpen(true)
   }

   const handleConfirm = (productId: string, quantity: number, preferences: string[]) => {
      cart.addItem(productId, quantity, preferences)
   }

   useEffect(() => {
      return viewPort.isDesktop
         ? scrollY.on('change', latestValue => {
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
         : scrollY.on('change', latestValue => {
              if (latestValue > 246 && !hasFired) {
                 if (navigationRef.current !== null) {
                    navigationRef.current.style =
                       'position: fixed;left: 0;top: 64px;width: 100%;z-index: 20;border-top: 1px solid #e5e7eb;'
                 }
                 setHasFired(true)
              }
              if (latestValue < 246 && hasFired) {
                 if (navigationRef.current !== null) {
                    navigationRef.current.style = ''
                 }
                 setHasFired(false)
              }
           })
   }, [scrollY, hasFired])

   return (
      <div className="relative ">
         <OrderHeroSection />
         <div className="xl:h-48"></div>
         <div className="border-gray-200 bg-white border-b" ref={navigationRef}>
            <div className="container flex justify-center items-center lg:gap-x-3 flex-wrap-reverse lg:flex-nowrap pt-6 lg:py-0 gap-y-3 lg:gap-y-0">
               <div className="w-full xl:w-3/5 h-10 xl:h-16 flex items-center">
                  <button
                     className="lg:p-2 lg:bg-gray-100 text-gray-600 rounded-full transition-colors shrink-0"
                     onClick={() => swiperRef.current?.slidePrev()}>
                     <ChevronLeft className="lg:w-6 lg:h-6 w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <Swiper
                     onSwiper={swiper => (swiperRef.current = swiper)}
                     slidesPerView="auto"
                     spaceBetween={viewPort.isDesktop ? 16 : 0}
                     modules={[Navigation]}
                     preventClicks={false}
                     preventClicksPropagation={false}
                     touchStartPreventDefault={false}
                     className="order-category-navigation h-full">
                     {productCategoryList.map(section => (
                        <SwiperSlide key={section.id} className="w-auto! shrink-0!">
                           <Link
                              to={section.id}
                              spy={true}
                              offset={-256}
                              duration={500}
                              smooth={true}
                              className="block h-full content-center md:font-light xl:basis-1/6 text-center transition-border ease-linear uppercase px-4 cursor-default"
                              activeClass={cn(
                                 'active border-b-2 md:border-b-3 border-primary font-bold text-primary',
                              )}>
                              {section.designation}
                           </Link>
                        </SwiperSlide>
                     ))}
                  </Swiper>
                  <button
                     className="lg:p-2 lg:bg-gray-100 rounded-full transition-colors shrink-0"
                     onClick={() => swiperRef.current?.slideNext()}>
                     <ChevronRight
                        className="lg:w-6 lg:h-6 w-5 h-5 text-gray-600"
                        strokeWidth={2.5}
                     />
                  </button>
               </div>
               <div className="w-full">
                  <input
                     type="search"
                     placeholder="Rechercher ..."
                     className="w-full h-12 border border-gray-300 rounded-full px-3"
                  />
               </div>
            </div>
         </div>
         <div className="container grid xl:grid-cols-3 gap-6 py-12">
            <aside
               className={cn('xl:col-span-full xl:space-y-12', {
                  'xl:col-span-2': cart.totalItems > 0,
               })}>
               {productCategoryList.map((category: ProductCategory, index: number) => {
                  const productItems = getProductsByCategory(category.id)
                  return (
                     <Element key={category.id} name={category.id} className="relative">
                        {index !== 0 && (
                           <div className="w-1/3 border-t-2 border-gray-400 border-dashed md:hidden mx-auto mt-12 mb-9"></div>
                        )}
                        <h2
                           className="text-sm lg:text-xl font-bold uppercase  font-plus-jakarta text-center md:text-start
                         text-secondary/80 leading-1 xl:pl-3 mb-6">
                           {category.designation}
                        </h2>
                        <div
                           className={cn('grid grid-cols-1 xl:grid-cols-3 md:gap-4 mt-1', {
                              'xl:grid-cols-2': cart.totalItems > 0,
                           })}>
                           {productItems.map((product, _index) => (
                              <Fade delay={200} triggerOnce key={product.id}>
                                 <div
                                    className="items-stretch cursor-pointer w-full h-44 md:h-35 grid grid-cols-5 xl:grid-cols-7 py-5 md:py-0
                                               md:rounded-xl border-b border-gray-200 md:border-none md:shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:scale-105 transition-all duration-200"
                                    onClick={() => openModal(product)}>
                                    <aside className="flex flex-col  justify-between col-span-3 xl:col-span-5 md:p-3 h-full">
                                       <section className="space-y-2">
                                          <h5 className="text-xl font-bold line-clamp-2 font-cabin leading-[110%] mt-1.5">
                                             {_.upperFirst(product.designation.toLowerCase())}
                                          </h5>
                                          <p className="text-foreground/90 leading-[115%] md:leading-[120%] lg:w-5/6 w-11/12">
                                             {_.truncate(product.description, { length: 65 })}
                                          </p>
                                       </section>
                                       <section className="flex justify-end pr-3">
                                          <PriceDisplay
                                             amount={parseFloat(product.price.toString())}
                                             className="
                                             text-tertiary leading-[100%] text-xl md:text-lg font-bebas tracking-wide"
                                          />
                                       </section>
                                    </aside>
                                    <aside className="h-full col-span-2 xl:col-span-2 flex justify-end items-start border-l border-gray-50 border-dashed rounded-lg">
                                       <figure
                                          className="relative w-full h-full
                                        max-md:border-gray-200 rounded-xl lg:rounded-tl-none lg:rounded-bl-none  overflow-hidden">
                                          <Image
                                             src={product.imageUrl}
                                             alt="thumbnail"
                                             fill
                                             className="object-cover"
                                          />
                                          <div
                                             className="rounded-full text-secondary bg-white md:w-10 md:h-10   w-7 h-7
                                              absolute bottom-1.5 right-1.5 flex items-center justify-center
                                              shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] max-md:translate-x-1/2 max-md:translate-y-1/2"
                                             onClick={e => {
                                                e.stopPropagation()
                                                openModal(product)
                                             }}>
                                             <PlusIcon className="md:w-5 md:h-5 w-4 h-4" />
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
               onOpenChangeAction={setIsModalOpen}
               onConfirmAction={handleConfirm}
            />
         )}
      </div>
   )
}
