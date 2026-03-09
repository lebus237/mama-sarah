import { TriviaDisplayCard } from '@/widgets/layout/ui/components/TriviaDisplayCard'
import Image from 'next/image'

export const OrderHeroSection = () => {
   return (
      <section className="xl:h-72 relative  w-full mx-auto xl:mt-20">
         <figure className="w-full h-full">
            <Image src="/images/hero-2.png" alt="Food" fill className="object-fill" priority />
         </figure>
         {/*<div className="absolute top-0 right-0 left-0 w-full  z-10 bg-secondary text-white text-center py-2">
               <p>Restaurant ouvert 24/24 - 7/7</p>
            </div>*/}
         <div className="absolute top-0 left-0 z-20 w-full h-full">
            <div className="container  h-full relative">
               <div className="absolute top-2/3 right-0  z-20 xl:h-64 xl:w-1/3">
                  <TriviaDisplayCard />
               </div>
            </div>
         </div>
      </section>
   )
}
