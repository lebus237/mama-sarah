'use client'
import { I18nLabel } from '@/shared/i18n'
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/common'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
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
         <DialogContent className="h-fit! lg:w-96 px-4">
            <DialogHeader>
               <DialogTitle className="font-cabin font-bold"></DialogTitle>
            </DialogHeader>

            <div className="flex justify-between gap-3  py-10 content-center">
               <button
                  type="button"
                  onClick={() => onSelect('whatsapp')}
                  className="bg-[#25D366] hover:bg-[#1ebe5d] rounded-4xl text-white font-semibold lg:w-24 lg:h-24 w-16 h-16">
                  <FaWhatsapp className="mx-auto w-12 h-12" />
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('facebook')}
                  className="bg-[#1877F2] hover:bg-[#166fe5] rounded-4xl text-white font-semibold lg:w-24 lg:h-24 w-16 h-16">
                  <FaFacebook className="mx-auto w-12 h-12" />
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('instagram')}
                  className="bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-4xl hover:bg-gray-200 text-secondary font-semibold lg:w-24 lg:h-24 w-16 h-16">
                  <FaInstagram className="mx-auto w-12 h-12" />
               </button>
            </div>
         </DialogContent>
      </Dialog>
   )
}
