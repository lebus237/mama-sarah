'use client'

import { Product } from '@/entities/product'
import { I18nLabel } from '@/shared/i18n'
import { Dialog, DialogContent, DialogHeader, PriceDisplay } from '@/shared/ui/common'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'
import Image from 'next/image'

type ProductDetailsModalProps = {
   product: Product | null
   open: boolean
   onOpenChange: (open: boolean) => void
}

function buildShareUrl(platform: 'whatsapp' | 'facebook' | 'instagram', productUrl: string) {
   const encodedUrl = encodeURIComponent(productUrl)

   switch (platform) {
      case 'whatsapp':
         return `https://wa.me/?text=${encodedUrl}`

      case 'facebook':
         return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`

      case 'instagram':
         return `https://www.instagram.com/?url=${encodedUrl}`

      default:
         return productUrl
   }
}

export function ProductDetailsModal({ product, open, onOpenChange }: ProductDetailsModalProps) {
   const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${product?.slug ?? product?.id ?? ''}`

   const share = (platform: 'whatsapp' | 'facebook' | 'instagram') => {
      if (!product) return
      const url = buildShareUrl(platform, productUrl)
      window.open(url, '_blank', 'noopener,noreferrer')
   }

   if (!product) return null

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0 shadow-xs shadow-secondary/70">
            <DialogHeader className="w-full aspect-video">
               <DialogTitle className="hidden"></DialogTitle>
               <figure className="w-full h-full relative">
                  <Image src={product.imageUrl} alt="thumbnail" fill className="object-cover" />
               </figure>
            </DialogHeader>

            <div className="p-4 space-y-3">
               <div>
                  <h3 className="text-2xl font-cabin font-bold">{product.designation}</h3>
                  <PriceDisplay
                     amount={Number(product.price)}
                     className="text-tertiary leading-[100%] lg:text-lg font-bebas tracking-wide"
                  />
               </div>

               {!!product.description && (
                  <p className="text-foreground font-cabin text-sm leading-relaxed">{product.description}</p>
               )}

               <div className="flex items-center gap-2 pt-2">
                  <button
                     type="button"
                     onClick={() => share('whatsapp')}
                     className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-secondary"
                     aria-label="Share on WhatsApp">
                     <MessageCircle className="w-5 h-5" />
                  </button>

                  <button
                     type="button"
                     onClick={() => share('facebook')}
                     className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-secondary"
                     aria-label="Share on Facebook">
                     <Facebook className="w-5 h-5" />
                  </button>

                  <button
                     type="button"
                     onClick={() => share('instagram')}
                     className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-secondary"
                     aria-label="Share on Instagram">
                     <Instagram className="w-5 h-5" />
                  </button>

                  <div className="flex-1" />

                  <button
                     type="button"
                     onClick={() => onOpenChange(false)}
                     className="px-4 py-2 rounded-full bg-secondary text-white font-semibold">
                     <I18nLabel label="Fermer" />
                  </button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
