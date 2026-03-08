'use client'

import { I18nLabel } from '@/shared/i18n'
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/common'
import { DialogTitle } from '@radix-ui/react-dialog'

type SocialPlatform = 'whatsapp' | 'facebook' | 'instagram'

type ShareProductModalProps = {
   open: boolean
   onOpenChange: (open: boolean) => void
   productUrl: string
}

function buildShareUrl(platform: SocialPlatform, productUrl: string) {
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

export function ShareProductModal({ open, onOpenChange, productUrl }: ShareProductModalProps) {
   const onSelect = (platform: SocialPlatform) => {
      const url = buildShareUrl(platform, productUrl)
      window.open(url, '_blank', 'noopener,noreferrer')
      onOpenChange(false)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-sm">
            <DialogHeader>
               <DialogTitle className="font-cabin font-bold">
                  <I18nLabel label="Partager" />
               </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-2">
               <button
                  type="button"
                  onClick={() => onSelect('whatsapp')}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-semibold">
                  WhatsApp
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('facebook')}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-semibold">
                  Facebook
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('instagram')}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-semibold">
                  Instagram
               </button>
            </div>
         </DialogContent>
      </Dialog>
   )
}
