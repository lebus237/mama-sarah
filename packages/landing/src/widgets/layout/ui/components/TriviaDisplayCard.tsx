import { Clock5Icon, MapIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/shared/lib/styles'

export function TriviaDisplayCard() {
   return (
      <div className=" hidden lg:block rounded-3xl bg-white h-full w-full shadow-[0px_0px_16px_rgba(17,17,26,0.1)] xl:px-6 xl:py-5">
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
   )
}
