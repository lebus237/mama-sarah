import { ReactNode } from 'react'
import { OrderHeader } from './components/OrderHeader'
import Image from 'next/image'
import Link from 'next/link'
import { Clock5Icon, MapIcon, PhoneIcon } from 'lucide-react'
import { cn } from '@/shared/lib/styles'

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
               <Image src="/images/hero.png" alt="Food" fill className="object-fill" />
            </figure>
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full  z-10"></div>
            <div className="absolute top-0 left-0 z-20 w-full h-full">
               <div className="container  h-full relative">
                  <div className="absolute rounded-3xl top-2/3 right-0  bg-white z-20 xl:h-64 xl:w-[35%] shadow-[0px_0px_16px_rgba(17,17,26,0.1)] xl:px-6 xl:py-5">
                     <div className="w-full h-full flex justify-between flex-col">
                        <div>
                           <p>000 Brigade Emombo</p>
                           <p>Yaounde, CMR</p>
                        </div>
                        <div className="h-1/3 content-center border-gray-200 border-t border-b">
                           Possiblite de se faire livrer, ou recuperer sur place
                        </div>
                        <div className="grid grid-cols-3">
                           {[
                              {
                                 icon: <PhoneIcon />,
                                 label: 'Appeller',
                                 link: 'tel:+225078888888',
                              },
                              {
                                 icon: <Clock5Icon />,
                                 label: 'Horaires',
                                 link: '#',
                              },
                              {
                                 icon: <MapIcon />,
                                 label: 'Localisation',
                                 link: '#',
                              },
                           ].map((item, index) => (
                              <Link
                                 href={item.link}
                                 className={cn('block text-center space-y-1.5 py-2.5', {
                                    'text-white bg-tertiary rounded-xl': index == 0,
                                 })}
                                 key={index}>
                                 <div className="w-fit mx-auto">{item.icon}</div>
                                 <span>{item.label}</span>
                              </Link>
                           ))}
                        </div>
                     </div>
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
