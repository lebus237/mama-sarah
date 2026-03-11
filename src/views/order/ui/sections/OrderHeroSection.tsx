import { TriviaDisplayCard } from '@/widgets/layout/ui/components/TriviaDisplayCard'
import Image from 'next/image'

export const OrderHeroSection = () => {
   return (
      <section className="h-48 xl:h-72 relative  w-full mx-auto mt-12 xl:mt-20">
         <figure className="w-full h-full">
            <Image
               src="/images/hero-2.png"
               alt="Food"
               fill
               className="object-cover lg:object-fill"
               priority
            />
         </figure>
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
