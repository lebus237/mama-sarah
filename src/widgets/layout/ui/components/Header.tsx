'use client'

import { OrderCounterDisplay } from '@/features/order'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   return (
      <div className="flex justify-between items-center w-full h-full">
         <aside>
            <h1 className="text-3xl font-bold">Logo</h1>
         </aside>
         <nav className="hidden md:block xl:space-x-6 uppercase">
            <Link href="/">Acceuil</Link>
            <Link href="/order">Commander</Link>
         </nav>
         <aside className="hidden md:block">
            <OrderCounterDisplay />
         </aside>
         <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
         {isMenuOpen && (
            <div className="absolute top-full left-0 w-full md:hidden bg-secondary/25 h-[calc(100vh-64px)]">
               <div className="h-1/2 bg-white">
                  <nav className="flex flex-col p-4 space-y-4 uppercase">
                     <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        Acceuil
                     </Link>
                     <Link href="/order" onClick={() => setIsMenuOpen(false)}>
                        Commander
                     </Link>
                  </nav>
               </div>
            </div>
         )}
      </div>
   )
}
