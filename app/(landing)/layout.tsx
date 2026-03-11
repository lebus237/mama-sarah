import NavbarSection from '@/views/home/sections/NavbarSection'
import { ReactNode } from 'react'

export default function LayoutPage({ children }: { children: ReactNode }) {
   return (
      <div>
         <NavbarSection />
         <main>{children}</main>
      </div>
   )
}
