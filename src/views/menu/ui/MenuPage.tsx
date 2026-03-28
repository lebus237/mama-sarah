'use client'

import { BackgroundImageCarousel } from '@/shared/ui'
import { MenuBrowserWidget } from './MenuBrowserWidget'

const backgroundImages = ['/images/chicken.jpg', '/images/spaghetti.jpg']
export function MenuPage() {
   return (
      <div className="w-full h-full relative overflow-hidden">
         <BackgroundImageCarousel images={backgroundImages} speed={15000} />
         <div className="absolute xl:top-0 left-0 right-0 w-full xl:h-[calc(100%-124px)] xl:mt-24 z-20 ">
            <div className="container mx-auto h-full bg-white xl:py-12 rounded-xl flex flex-col justify-between">
               <div>DISH DESCRIPTION</div>
               <div className="xl:w-5/6 mx-auto">
                  <MenuBrowserWidget />
               </div>
            </div>
         </div>
      </div>
   )
}
