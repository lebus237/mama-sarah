'use client'

import { getProducts } from '@/entities/product'
import { useNavigator } from '@/shared/lib/router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

const SlideNavButton = ({ onClick, icon }: { onClick: () => void; icon: React.ReactNode }) => {
   return (
      <button
         className="w-12 h-12 aspect-square rounded-full bg-tertiary text-white flex justify-center items-center"
         onClick={onClick}>
         {icon}
      </button>
   )
}

export function MenuBrowserWidget() {
   const navigatorService = useNavigator()
   const swiper = useSwiper()

   return (
      <div className="w-full">
         <Swiper
            className="w-full relative"
            spaceBetween={30}
            slidesPerView={7}
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}>
            <div className="absolute left-0 top-[calc(50%)] -translate-y-1/2 z-20">
               <SlideNavButton onClick={() => swiper.slidePrev()} icon={<ArrowLeft />} />
            </div>

            {getProducts().map(product => (
               <SwiperSlide key={product.id}>
                  <figure
                     className="relative w-full aspect-square cursor-pointer"
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
            <div className="absolute right-0 top-[calc(50%)] -translate-y-1/2 z-20">
               <SlideNavButton onClick={() => swiper.slideNext()} icon={<ArrowRight />} />
            </div>
         </Swiper>
      </div>
   )
}
