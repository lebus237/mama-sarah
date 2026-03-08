'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from '@/shared/ui/common'
import { PriceDisplay } from '@/shared/ui/common'
import { Product } from '@/entities/product'
import { cn } from '@/shared/lib/styles'

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

   const totalPrice = Number(product.price) * quantity

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0">
            <DialogHeader className="p-6 pb-4 bg-linear-to-r from-primary/5 to-primary/10 border-b">
               <DialogTitle className="text-2xl font-bold text-secondary tracking-tight">
                  {product.designation}
               </DialogTitle>
               {product.description && (
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{product.description}</p>
               )}
            </DialogHeader>

            <div className="p-6 space-y-6">
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Unit Price</span>
                  <PriceDisplay amount={Number(product.price)} className="text-xl font-bold text-secondary" />
               </div>

               <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Quantity</label>
                  <div className="flex items-center justify-center gap-6">
                     <button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        disabled={quantity <= 1}>
                        <Minus className="w-5 h-5 text-gray-600" />
                     </button>
                     <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                        <span className="text-2xl font-bold text-secondary">{quantity}</span>
                     </div>
                     <button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-200 hover:scale-105">
                        <Plus className="w-5 h-5 text-primary" />
                     </button>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Preferences</label>
                  <div className="flex flex-wrap gap-2">
                     {(product.preferences ?? []).map(option => (
                        <button
                           key={option}
                           type="button"
                           onClick={() => togglePreference(option)}
                           className={cn(
                              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                              selectedPreferences.includes(option)
                                 ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                           )}>
                           {option}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <PriceDisplay amount={totalPrice} className="text-2xl font-bold text-primary" />
               </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t bg-gray-50/50">
               <div className="flex w-full gap-3">
                  <button
                     type="button"
                     onClick={() => onOpenChange(false)}
                     className="flex-1 px-6 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                     Cancel
                  </button>
                  <button
                     type="button"
                     onClick={handleConfirm}
                     className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
                     <ShoppingCart className="w-4 h-4" />
                     Add to Cart
                  </button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
