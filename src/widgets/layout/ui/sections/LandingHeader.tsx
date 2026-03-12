import { I18nLabel } from '@/shared/i18n'
import { routePaths } from '@/shared/routes'
import { PhoneCall, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Rotate } from 'react-awesome-reveal'

export const LandingHeader = () => {
   return (
      <div className="container text-white text-cabin flex justify-between relative">
         <Link href="tel:+237655050599" className="flex items-center gap-x-1.5">
            <div className="w-12 h-12 content-center rounded-full bg-orange-700 ">
               <PhoneCall className="mx-auto" />
            </div>
            <span className="font-bebas font-medium text-3xl tracking-wide">+237 655050599</span>
         </Link>
         {/*<div className="flex items-center gap-12 text-lg font-bold font-plus-jakarta capitalize">
            <Link href={routePaths.ABOUTuS}>
               <I18nLabel label="menu.aboutUs" />
            </Link>
            <div className="w-24"></div>
            <Link href={routePaths.OURCHEF}>
               <I18nLabel label="menu.ourChef" />
            </Link>
         </div>*/}
         <Link href={routePaths.ORDER}>
            <button className="flex gap-x-1.5 items-center py-3 px-4 rounded-full bg-orange-700 text-white cursor-pointer">
               <span className="font-bebas tracking-wider font-normal text-lg  mt-1 block">
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
