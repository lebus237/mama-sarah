'use client'

import { Product } from '@/entities/product'
import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import { Dialog, DialogContent, DialogFooter, DialogHeader, PriceDisplay } from '@/shared/ui/common'
import { CustomIcon } from '@/shared/ui/icons'
import { DialogTitle } from '@radix-ui/react-dialog'
import _ from 'lodash'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type AddToCartModalProps = {
   product: Product
   open: boolean
   onOpenChange: (open: boolean) => void
   onConfirm: (productId: string, quantity: number, preferences: string[]) => void
}

export function AddToCartModal({ product, open, onOpenChange, onConfirm }: AddToCartModalProps) {
   const [quantity, setQuantity] = useState(1)
   const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])

   const handleQuantityChange = (delta: number) => {
      setQuantity(prev => Math.max(1, prev + delta))
   }

   const togglePreference = (pref: string) => {
      setSelectedPreferences(prev =>
         prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref],
      )
   }

   const handleConfirm = () => {
      onConfirm(product.id, quantity, selectedPreferences)
      setQuantity(1)
      setSelectedPreferences([])
      onOpenChange(false)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0">
            <DialogHeader className="w-full aspect-video">
               <DialogTitle className="hidden"></DialogTitle>
               <figure className="w-full h-full relative">
                  <Image src={product.imageUrl} alt="thumbnail" fill className="object-cover" />
               </figure>
            </DialogHeader>

            <div className="*:p-4">
               <div>
                  <h3 className="text-2xl font-cabin font-bold">{product.designation}</h3>
                  <PriceDisplay
                     amount={Number(product.price)}
                     className="text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide"
                  />
                  <p className="pt-3 text-foreground font-cabin text-sm">
                     {_.truncate(product.description, { length: 50 })}
                  </p>
               </div>

               <div className=" bg-gray-200 py-3">
                  <div className="flex justify-between p-3 bg-white items-center rounded-md">
                     <div>
                        <label className="text-base font-medium text-secondary">
                           <I18nLabel label="Quantity" />
                        </label>
                     </div>
                     <div className="flex items-center justify-center gap-3">
                        <button
                           type="button"
                           onClick={() => handleQuantityChange(-1)}
                           className="lg:w-8 lg:h-8 rounded-full border border-secondary  flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-90 "
                           disabled={quantity <= 1}>
                           <Minus className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="">
                           <span className="text-2xl text-secondary font-bebas">{quantity}</span>
                        </div>
                        <button
                           type="button"
                           onClick={() => handleQuantityChange(1)}
                           className="lg:w-8 lg:h-8  rounded-full  border border-secondary  flex items-center justify-center transition-all duration-200 hover:scale-105">
                           <Plus className="w-5 h-5 " />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="xl:pl-3">
                     <label className="text-base font-medium text-secondary">
                        <I18nLabel label="Preferences" />
                     </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {(product.preferences ?? []).map(option => (
                        <button
                           key={option}
                           type="button"
                           onClick={() => togglePreference(option)}
                           className={cn(
                              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                              selectedPreferences.includes(option)
                                 ? 'bg-primary text-white shadow-sm shadow-primary/25 scale-105'
                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                           )}>
                           {option}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            <DialogFooter className="border-t border-gray-200 border-dashed">
               <div className="flex w-full p-4">
                  <button
                     type="button"
                     onClick={handleConfirm}
                     className="flex-1 inline-flex items-center cursor-pointer justify-center gap-2 px-6 py-3 rounded-full bg-tertiary text-white text-base font-semibold">
                     <CustomIcon type="food-cart" size={24} />
                     <I18nLabel label="Ajouter au panier" />
                  </button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
