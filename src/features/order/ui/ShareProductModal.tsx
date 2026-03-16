'use client'
import { I18nLabel } from '@/shared/i18n'
import { Dialog, DialogContent, DialogHeader } from '@/shared/ui/common'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
type SocialPlatform = 'whatsapp' | 'facebook' | 'instagram'

type ShareProductModalProps = {
   open: boolean
   onOpenChange: (open: boolean) => void
   productUrl: string
}
interface SocialButtonProps {
  label: string
  icon: ReactNode
  platform: SocialPlatform
  onClick: (platform: SocialPlatform) => void
  style?: string
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

const SocialButton = ({ label, icon, platform, onClick, style }: SocialButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => onClick(platform)}
        className={`flex justify-center items-center rounded-3xl text-white font-semibold lg:w-24 lg:h-24 w-16 h-16 ${style}`}
        aria-label={`Share on ${label}`}
      >
        {icon}
      </button>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
 const socialButtons: SocialButtonProps[] = [
    { label: 'WhatsApp', icon: <FaWhatsapp className="w-12 h-12 lg:w-16 lg:h-16" />, platform: 'whatsapp', onClick: onSelect, style: 'bg-[#25D366] hover:bg-[#1ebe5d]' },
    { label: 'Facebook', icon: <FaFacebook className="w-12 h-12 lg:w-16 lg:h-16" />, platform: 'facebook', onClick: onSelect, style: 'bg-[#1877F2] hover:bg-[#166fe5]' },
    { label: 'Instagram', icon: <FaInstagram className="w-12 h-12 lg:w-16 lg:h-16 text-white" />, platform: 'instagram', onClick: onSelect, style: 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  ]
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="h-fit! lg:w-96 px-4">
            <DialogHeader>
               <DialogTitle className="font-cabin font-bold"></DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-6 py-8">
               {socialButtons.map((btn) => (
            <SocialButton
              key={btn.platform}
              label={btn.label}
              icon={btn.icon}
              platform={btn.platform}
              onClick={btn.onClick}
              style={btn.style}
            />
          ))}
            </div>
         </DialogContent>
      </Dialog>
   )
}
