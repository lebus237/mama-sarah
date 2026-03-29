'use client'

import { getProducts, Product } from '@/entities/product'
import { useNavigator } from '@/shared/lib/router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

const SlideNavButton = ({
   onClick,
   icon,
   disabled,
}: {
   onClick: () => void
   icon: ReactNode
   disabled?: boolean
}) => {
   return (
      <button
         type="button"
         className="w-12 h-12 hover:bg-white/80 hover:text-secondary/70 transition-colors duration-200 cursor-pointer aspect-square rounded-full bg-primary/90 text-white flex justify-center items-center"
         onClick={onClick}>
         {icon}
      </button>
   )
}

const SwiperNavigationControls = () => {
   const swiper = useSwiper()

   return (
      <>
         <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
            <SlideNavButton onClick={() => swiper.slidePrev()} icon={<ChevronLeft size={30} />} />
         </div>
         <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
            <SlideNavButton onClick={() => swiper.slideNext()} icon={<ChevronRight size={30} />} />
         </div>
      </>
   )
}

export function MenuBrowserWidget({ items }: { items: Product[] }) {
   const navigatorService = useNavigator()

   return (
      <div className="w-full">
         <Swiper
            className="w-full relative xl:[&>div]:gap-x-3 3xl:[&>div]:gap-x-6"
            slidesPerView={6.5}
            mousewheel
            modules={[Mousewheel]}>
            <SwiperNavigationControls />

            {items.map(product => (
               <SwiperSlide key={product.id}>
                  <figure
                     className="relative w-full xl:aspect-16/10 3xl:aspect-square cursor-pointer rounded-lg overflow-hidden shadow-lg border border-gray-200"
                     onClick={() => navigatorService.queryNavigate({ element: product.slug! })}>
                     <Image
                        fill
                        src={product.imageUrl}
                        alt={product.designation}
                        className="object-cover"
                     />
                     <h3>{product.designation}</h3>
                  </figure>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
