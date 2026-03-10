'use client'

import { Product } from '@/entities/product'
import { useCart } from '@/features/order'
import { useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export function OrderPage() {
   const { scrollY } = useScroll()
   const [hasFired, setHasFired] = useState(false)
   const navigationRef = useRef<HTMLDivElement | null>(null)
   const cart = useCart()

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [product, setProduct] = useState<Product | undefined>()
   const [activeSection, setActiveSection] = useState<string | null>(null)
   const swiperRef = useRef<SwiperType | null>(null)

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
         {/* <OrderHeroSection />
         <div className="xl:h-48"></div>
         <div className="border-gray-200 bg-white border-b" ref={navigationRef}>
            <div className="container flex justify-center items-center lg:gap-x-3">
               <div className="xl:w-3/5 xl:h-16 flex items-center">
                  <button
                     className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                     onClick={() => swiperRef.current?.slidePrev()}>
                     <ChevronLeft className="w-6 h-6 " strokeWidth={2.5} />
                  </button>
                  <Swiper
                     onSwiper={swiper => (swiperRef.current = swiper)}
                     slidesPerView={'auto'}
                     spaceBetween={16}
                     modules={[Navigation]}
                     preventClicks={false}
                     preventClicksPropagation={false}
                     touchStartPreventDefault={false}
                     className="order-category-navigation h-full flex-1">
                     {productCategoryList.map(section => (
                        <SwiperSlide key={section.id} className="w-auto! shrink-0!">
                           <Link
                              to={section.id}
                              spy={true}
                              offset={-256}
                              duration={500}
                              smooth={true}
                              className="block h-full content-center font-light xl:basis-1/6 text-center transition-border ease-linear uppercase px-4 cursor-default"
                              activeClass={cn(
                                 'active border-b-3 border-primary font-bold text-primary',
                              )}>
                              {section.designation}
                           </Link>
                        </SwiperSlide>
                     ))}
                  </Swiper>
                  <button
                     className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                     onClick={() => swiperRef.current?.slideNext()}>
                     <ChevronRight className="w-6 h-6 text-primary" strokeWidth={2.5} />
                  </button>
               </div>
               <div className="xl:w-1/5">
                  <input
                     type="search"
                     placeholder="Rechercher ..."
                     className="w-full h-12 border border-gray-300 rounded-full px-3"
                  />
               </div>
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
                     <Element key={category.id} name={category.id} className="relative">
                        <h2
                           className="lg:text-xl font-bold capitalize font-plus-jakarta 
                        max-md:text-2xl text-secondary/80 leading-1 xl:pl-3">
                           {category.designation}
                        </h2>
                        <div
                           className={cn('grid grid-cols-1 xl:grid-cols-3 gap-4 lg:mt-6', {
                              'xl:grid-cols-2': cart.totalItems > 0,
                           })}>
                           {productItems.map((product, _index) => (
                              <Fade delay={200} triggerOnce key={product.id}>
                                 <div
                                    className="items-stretch cursor-pointer w-full min-h-35 grid grid-cols-2 xl:grid-cols-7
                                               max-md:border-b border-gray-200  md:rounded-xl md:shadow-[0px_8px_24px_rgba(149,157,165,0.2)] hover:scale-105 transition-all duration-200"
                                    onClick={() => openModal(product)}>
                                    <aside className="flex flex-col  justify-between xl:col-span-5 md:p-3 h-full ">
                                       <section className="space-y-2">
                                          <h5 className="xl:text-xl font-bold line-clamp-2 font-cabin">
                                             {_.upperFirst(product.designation.toLowerCase())}
                                          </h5>
                                          <p className="text-foreground/90 leading-[110%] lg:leading-[120%] lg:w-5/6">
                                             {_.truncate(product.description, { length: 70 })}
                                          </p>
                                       </section>
                                       <section className="flex max-md:mb-4  md:justify-end mt-1 ">
                                          <PriceDisplay
                                             amount={parseFloat(product.price.toString())}
                                             className="
                                             text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide"
                                          />
                                       </section>
                                    </aside>
                                    <aside className="h-full xl:col-span-2 flex justify-end items-start border-l border-gray-50 border-dashed rounded-lg">
                                       <figure
                                          className="relative w-[70%] h-[90%] md:w-full md:h-full 
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
               onOpenChange={setIsModalOpen}
               onConfirm={handleConfirm}
            />
         )} */}
      </div>
   )
}
