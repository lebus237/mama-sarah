import { ReactNode } from 'react'
import { OrderHeader } from './components/OrderHeader'
import Image from 'next/image'
import { TriviaDisplayCard } from './components/TriviaDisplayCard'

export function OrderPanelLayout({ children }: { children: ReactNode }) {
   return (
      <div className="w-full h-full font-cabin text-secondary">
         <header className="w-full border-b border-gray-100 fixed top-0 left-0 z-50 bg-white">
            <div className="container  content-center xl:h-20">
               <OrderHeader />
            </div>
         </header>
         <section className="xl:h-72 relative  w-full mx-auto xl:mt-20">
            <figure className="w-full h-full">
               <Image src="/images/hero-2.png" alt="Food" fill className="object-fill" />
            </figure>
            {/*<div className="absolute top-0 right-0 left-0 w-full  z-10 bg-secondary text-white text-center py-2">
               <p>Restaurant ouvert 24/24 - 7/7</p>
            </div>*/}
            <div className="absolute top-0 left-0 z-20 w-full h-full">
               <div className="container  h-full relative">
                  <div className="absolute top-2/3 right-0  z-20 xl:h-64 xl:w-[35%] ">
                     <TriviaDisplayCard />
                  </div>
               </div>
            </div>
         </section>
         <div className="xl:h-48"></div>
         <main>{children}</main>
         <footer className="xl:h-20 bg-secondary"></footer>
      </div>
   )
}
