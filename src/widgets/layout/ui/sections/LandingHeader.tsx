import { businessInfo } from '@/shared/config/business-info'
import { I18nLabel } from '@/shared/i18n'
import { routePaths } from '@/shared/routes'
import { PhoneCall, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Rotate } from 'react-awesome-reveal'

export const LandingHeader = () => {
   return (
      <div className="container text-white text-cabin flex justify-between relative">
         <div className="flex items-center gap-x-1.5">
            <div className="w-10 h-10 content-center rounded-full bg-orange-700 ">
               <PhoneCall className="mx-auto" size={24} />
            </div>
            {businessInfo.phoneNumbers.map((phone, index) => (
               <Link
                  href={`tel:${phone.number}`}
                  key={index}
                  className="font-bebas font-medium text-[1.625rem] tracking-wide">
                  {phone.number}
               </Link>
            ))}
         </div>
         <Link href={routePaths.ORDER}>
            <button className="flex gap-x-1.5 items-center py-3 px-6 rounded-full bg-orange-700 text-white cursor-pointer">
               <span className="font-bebas tracking-wider font-normal text-xl  mt-1 block">
                  <I18nLabel label="action.orderOnline" />
               </span>
               <ShoppingBag className="w-5 h-5" />
            </button>
         </Link>
         <div className="absolute left-1/4 right-1/4 h-fit flex justify-center z-50 ">
            <Rotate delay={100}>
               <figure className="relative w-36 h-36 border content-center bg-white rounded-full shadow-sm">
                  <Image
                     width={100}
                     height={100}
                     src="/logo.jpeg"
                     alt="chicken"
                     className="mx-auto"
                  />
               </figure>
            </Rotate>
         </div>
      </div>
   )
}
