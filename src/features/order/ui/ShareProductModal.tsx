'use client'
import { I18nLabel } from '@/shared/i18n'
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/common'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FaFacebook ,FaInstagram,FaWhatsapp } from "react-icons/fa";
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
         <DialogContent className="max-lg:rounded-xl  sm:max-w-sm w-[90%] lg:w-full max-h-[65vh] lg:max-h-full">
            <DialogHeader>
               <DialogTitle className="font-cabin font-bold">
                  <I18nLabel label="Partager" />
               </DialogTitle>
            </DialogHeader>

            <div className=" grid grid-cols-1 gap-3 lg:gap-2 p-2 lg:px-0 lg:mx-4">
               <button type="button" onClick={() => onSelect('whatsapp')}
                 className="
                 bg-[#25D366] hover:bg-[#1ebe5d]
                 w-full inline-flex items-center justify-center
                 px-4 py-3 rounded-xl
                 text-white font-semibold space-x-4
                 transition-all duration-200
                 hover:scale-105 hover:shadow-md 
                 ">
                 <FaWhatsapp size={26}/>
                 <p className='text-lg'>WhatsApp</p>
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('facebook')}
                  className="bg-[#1877F2] hover:bg-[#166fe5] w-full inline-flex items-center justify-center px-4 rounded-xl 
                   text-white font-semibold space-x-4 py-3 
                    transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <FaFacebook size={26}/>
                  <p className='text-lg'>Facebook</p>
               </button>

               <button
                  type="button"
                  onClick={() => onSelect('instagram')}
                  className=" bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]
                  w-full inline-flex items-center justify-center px-4 py-3 rounded-xl
                  space-x-4 hover:bg-gray-200 text-secondary font-semibold
                   transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <FaInstagram size={26}/>
                  <p className='text-lg'>Instagram</p> 
               </button>
            </div>
         </DialogContent>
      </Dialog>
   )
}
