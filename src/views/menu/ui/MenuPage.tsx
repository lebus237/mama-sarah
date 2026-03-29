'use client'

import { BackgroundImageCarousel } from '@/shared/ui'
import { MenuBrowserWidget } from './MenuBrowserWidget'
import Image from 'next/image'
import { Product, productCollection } from '@/entities/product'
import { I18nLabel } from '@/shared/i18n'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import { ShareProductModal } from '@/features/order'
import { Share2 } from 'lucide-react'
import Link from 'next/link'
import { routePaths } from '@/shared/routes'

const backgroundImages = ['/images/cheminee-braises-Enhancer.png']
export function MenuPage({ product }: { product?: Product }) {
   const [isShareModalOpen, setIsShareModalOpen] = useState(false)

   const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${product?.slug ?? product?.id}`

   return (
      <div className="w-full h-full relative overflow-hidden">
         <BackgroundImageCarousel images={backgroundImages} speed={15000} />
         <div className="absolute xl:top-0 left-0 right-0 w-full xl:h-[calc(100%-16px)] 3xl:h-[calc(100%-32px)] xl:mt-2 3xl:my-4 z-20 ">
            <div className="container mx-auto h-full bg-white xl:py-4 3xl:py-6 rounded-xl flex flex-col justify-between">
               {product ? (
                  <Fragment>
                     <div className="xl:mt-2 3xl:mt-4 xl:pt-2 3xl:px-6 xl:px-4 3xl:py-4 ">
                        <div className="grid grid-cols-2">
                           <aside className="col-span-1">
                              <div className="space-y-6 content-center h-full xl:w-4/5 mx-auto">
                                 <span className="uppercase font-cabin text-tertiary font-semibold">
                                    {product?.categoryName}
                                 </span>
                                 <h2 className="xl:text-4xl font-bold leading-[130%] text-secondary">
                                    {product?.designation}
                                 </h2>
                                 <p className="font-cabin xl:text-lg leading-[150%] text-foreground/90">
                                    {product?.description}
                                 </p>
                                 {product?.preferences.length > 0 && (
                                    <div className="space-y-2">
                                       <h4 className="font-medium">
                                          <I18nLabel label="Preferences sur le plat" />
                                       </h4>
                                       <ul className="space-y-1">
                                          {product?.preferences.map(pref => (
                                             <li key={pref} className="flex items-center gap-3">
                                                <div className="h-2 w-2 bg-foreground rounded-full"></div>
                                                <span className=" text-secondary text-sm font-poppins">
                                                   {_.upperFirst(pref)}
                                                </span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 )}
                                 <div className="flex gap-x-3">
                                    <Link
                                       className="block"
                                       href={`${routePaths.ORDER}/?pick=${product?.slug ?? product?.id}`}>
                                       <button className="bg-tertiary text-white px-5 py-3 rounded-full cursor-pointer">
                                          <I18nLabel label="action.order.now" />
                                       </button>
                                    </Link>
                                    <button
                                       type="button"
                                       onClick={() => setIsShareModalOpen(true)}
                                       className="flex items-center justify-center md:w-12 md:h-12 h-16 w-16 rounded-full bg-blue-500  text-white border-blue-500 cursor-pointer">
                                       <Share2 className="w-6 h-6" />
                                    </button>
                                 </div>
                              </div>
                           </aside>
                           <aside className="col-span-1 relative">
                              <figure className="xl:w-4/5 xl:aspect-16/11 3xl:aspect-16/12 xl:ml-[10%] relative xl:rounded-2xl 3xl:rounded-3xl overflow-hidden">
                                 <Image
                                    src={product?.imageUrl as string}
                                    fill
                                    alt="alt"
                                    className="object-cover"
                                 />
                              </figure>
                           </aside>
                        </div>
                     </div>
                     <div className="xl:w-full mx-auto 3xl:px-6 xl:px-4">
                        <MenuBrowserWidget items={productCollection()} />
                     </div>
                  </Fragment>
               ) : (
                  <div>Aucun menu disponible pour le moment</div>
               )}
            </div>
         </div>
         <ShareProductModal
            open={isShareModalOpen}
            onOpenChange={setIsShareModalOpen}
            productUrl={productUrl}
         />
      </div>
   )
}
